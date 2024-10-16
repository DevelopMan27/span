import InvoiceItem from "./InvoiceItem";

import { Text } from "react-native";

export const RenderInvoiceItem = ({ item }) => (
  <>
    <InvoiceItem
      colors={item.colors}
      borderColor={item.borderColor}
      statusColor={item.statusColor}
      companyName={item.companyName}
      location={item.location}
      status={item.status}
      invoiceNo={item.invoiceNo}
      date={item.date}
      id={item.id}
      page={item.page}
    />
  </>
);
