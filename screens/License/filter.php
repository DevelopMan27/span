<?php
include "utils/MiddleWare.php";

// Retrieve parameters
$tab_id = $req['tab_id'];
$uid = $req['uid'];
$utype = $req['utype'];
$text = mysqli_real_escape_string($conn, $req['text']);
$today = date('Y-m-d');
$filter = isset($req['filter']) && !empty($req['filter']) ? $req['filter'] : []; // Set filter
$LIMIT = isset($req["limit"]) ? (int)$req["limit"] : 10; // Default limit
$OFFSET = isset($req['offset']) ? (int)$req['offset'] : 0; // Default offset
$sdate = isset($req['startdate']) ? $req['startdate'] : null;
$edate = isset($req['enddate']) ? $req['enddate'] : null;

// Initialize query components
$conditions = [];
$permission_condition = "1 = 1"; // Default to show all data
$tab_condition = "1 = 1"; // Default to no filtering by tab
$camera_serial_join = "";

// Check if all parameters are empty for initial query
if ($tab_id == 0 && empty($filter) && $sdate == "" && $edate == "" && $text == "") {
      if ($usertype == 1 || $usertype == 2) {
      $query = "SELECT 
            `id`, `qr_string`, `invoice_number`, `purchase_number`, `machine_name`, 
            `model_number`, `company_name`, `ipc_service_tag`, `io_service_number`, 
            `lens_info`, `setup_version`, `engineer_id`, `qc_id`, `remark`, 
            `key`, `in_house_flag`, `created_on`, `expiry_date`, `status`, 
            `location`, `barcode`, `two_d_code`, `changed_json`, `uni_casting_admin` 
          FROM `products` 
          WHERE `engineer_id` = '$userId' AND `expiry_date` > '$today'
          ORDER BY `id` DESC";
    } else {
        $query = "SELECT 
                `id`, `qr_string`, `invoice_number`, `purchase_number`, `machine_name`, 
                `model_number`, `company_name`, `ipc_service_tag`, `io_service_number`, 
                `lens_info`, `setup_version`, `engineer_id`, `qc_id`, `remark`, 
                `key`, `in_house_flag`, `created_on`, `expiry_date`, `status`, 
                `location`, `barcode`, `two_d_code`, `changed_json`, `uni_casting_admin` 
              FROM `products` 
              WHERE `expiry_date`>'$today'
              ORDER BY `id` DESC";
    }
} else {
    // Set tab condition based on tab_id if needed
    switch ($tab_id) {
        case 1:
            $tab_condition = "p.status = 0";
            break;
        case 2:
            $tab_condition = "p.in_house_flag = 1 AND p.status = 1";
            break;
        case 3:
            $tab_condition = "p.in_house_flag = 0 AND p.status = 1";
            break;
    }

    // Define filters
    if (!empty($filter)) {
        // Build the text search condition
        foreach ($filter as $field) {
            if ($field != "camera_serial_number") {
                $conditions[] = "$field LIKE '%$text%'";
            }
        }

        // If camera_serial_number filter is included
        if (in_array("camera_serial_number", $filter)) {
            $camera_serial_join = "INNER JOIN product_camera AS cs ON cs.product_id = p.id";
            $conditions[] = "cs.camera_serial LIKE '%$text%'";
        }
    }

    // Construct the condition for text search
    $fcon = !empty($conditions) ? implode(' OR ', $conditions) : "";

    // Determine permissions based on user type
    if ($utype == 2) {
        $permission_condition = "(p.engineer_id = $uid OR p.uni_casting_admin = $uid)";
    } else if ($utype == 3) {
        $permission_condition = "1 = 1";  // Show all data
    } else if ($utype == 1) {
        $permission_condition = "(p.engineer_id = $uid)";
    }

    // Construct the query
    $query = "
        SELECT
            p.*, u_eg.username AS engineer_name
        FROM
            products AS p
        INNER JOIN
            users AS u_eg ON p.engineer_id = u_eg.id
        $camera_serial_join
        WHERE
            $tab_condition
    ";
    
    if(!empty($permission_condition)){
        $query .= " AND $permission_condition";
    }

    // Apply the filters only if specified
    if (!empty($fcon)) {
        $query .= " AND ($fcon)";
    }

    // Add the expiry date condition
    $query .= " AND p.expiry_date > '$today'";

    // Apply the date range if specified
    if ($sdate && $edate) {
        $query .= " AND p.created_on BETWEEN '$sdate' AND '$edate'";
    }

    // Add ordering and limits
    $query .= " ORDER BY p.created_on DESC
                LIMIT $LIMIT OFFSET $OFFSET";
}

// Execute the query
$result = mysqli_query($conn, $query);

if ($result) {
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode([
    'data' => $data,
    'filter' => $filter,
    'sql' => [
        'tab_id' => $tab_id,
        'sdate' => $sdate,
        'edate' => $edate,
        'filter' => $filter,
        'text' => $text,
        'sql' => $query
    ]
]);
} else {
    // Return error if query failed
    echo json_encode(['error' => $conn->error, 'sql' => $query]);
}
?>
