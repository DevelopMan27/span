// // MyNativeModule.cpp

#include "MyNativeModuleCpp.h"

// const char* getHelloWorld() {
//     return "Hello, world!";
// }

#include <string>
#include <cstdio>
#include <cstdlib>

// Your existing code

 
#include <string>
#include <cstdio>
#include <cstdlib>
#include <time.h>
#include <wchar.h>
#include <sched.h>
#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>  // Add this at the top of your source file

#include <cstdio>
#include <utility>
#include "../nlohmann/single_include/nlohmann/json.hpp"

#define LOG_TAG "MyCppModule"
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__)

using namespace std;

#define strcpy_s strcpy
#define _CRT_SECURE_NO_DEPRECATE
#define _CRT_NONSTDC_NO_DEPRECATE

#define NUMBER            0

#define CAPITAL_CHAR    1
#define SMALL_CHAR        2

#define MAX_ID_LENGTH        22
#define MAX_SUM_VALUE        MAX_ID_LENGTH * 4096

#define PART_OK            1
#define PART_NOT_IN_USE		0

#define HDD_INDEX           0
#define GU_INDEX            1
#define IO_INDEX            2
#define PRODUCT_INDEX        3
#define CAM_INDEX            4

// #define PHARMA_BLISTER_MACHINE                "Blister"
// #define PHARMA_CARTONING_MACHINE            "Cartoning"
// #define PHARMA_CASEPACKER_MACHINE            "CasePacker"
// #define PHARMA_LABELLING_MACHINE            "Labelling"
// #define PHARMA_COUNTING_MACHINE            "Counting"
// #define PHARMA_MICROTABLET_MACHINE          "MicroTablet"


#define PHARMA_BLISTER_PACK_MACHINE			"Blister Pack"
#define PHARMA_CARTONING_MACHINE			"Cartoning"
#define PHARMA_CASE_PACKER_MACHINE			"Case Packer"
#define PHARMA_LABELLING_MACHINE			"Labelling"
#define PHARMA_TABLET_COUNTING_MACHINE		"Tablet Counting"
#define PHARMA_MICROTABLET_MACHINE			"Micro Tablet"
#define PHARMA_CONTAINER_COUNTING_MACHINE	"Container Counting"
#define PHARMA_SACHET_FILLING_MACHINE		"Sachet Filling"
#define PHARMA_PUNCH_INSPECTION_MACHINE		"Punch Inspection"
#define PHARMA_PRINT_AND_CHECK_MACHINE		"Print And Check"
#define PHARMA_SEAL_INSPECTION_MACHINE		"Seal Inspection"
#define PHARMA_FFS_RESPULES_MACHINE			"FFS Respules"

using json = nlohmann::json;

std::vector<std::pair<long, std::vector<long> > > final_numbers;
std::vector<std::pair<long, std::vector<long> > > final_reverse_numbers;
std::vector<std::vector<std::string> > capital_char_patterns;
std::vector<std::vector<std::string> > small_char_patterns;
std::vector<std::vector<std::string> > number_patterns;
std::string dummy_pattern[2];
std::vector<std::string> three_char_combinations;
std::map<long, std::string> machine_name_index_map;
using json = nlohmann::json;


void GetTwoCharCombination(std::vector<std::string> &result) {
	result.clear();
	result.push_back("001000");
	result.push_back("010000");
	result.push_back("111111");
	result.push_back("100111");
	result.push_back("110111");
	result.push_back("101111");
	result.push_back("001010");
	result.push_back("000000");
	result.push_back("011101");
	result.push_back("000101");
	result.push_back("111100");
	result.push_back("001001");
	result.push_back("101101");
	result.push_back("110101");
	result.push_back("101001");
	result.push_back("001100");
	result.push_back("111001");
	result.push_back("001111");
	result.push_back("010011");
	result.push_back("100010");
	result.push_back("111010");
	result.push_back("111000");
	result.push_back("100000");
	result.push_back("010010");
	result.push_back("100100");
	result.push_back("000010");
	result.push_back("010001");
	result.push_back("000100");
	result.push_back("010100");
	result.push_back("110100");
	result.push_back("100001");
	result.push_back("000111");
	result.push_back("101000");
	result.push_back("100101");
	result.push_back("111101");
	result.push_back("011111");
	result.push_back("111011");
	result.push_back("111110");
	result.push_back("001011");
	result.push_back("000001");
	result.push_back("000011");
	result.push_back("110001");
	result.push_back("011011");
	result.push_back("000110");
	result.push_back("010101");
	result.push_back("011000");
	result.push_back("010110");
	result.push_back("100011");
	result.push_back("100110");
	result.push_back("110010");
	result.push_back("101010");
	result.push_back("101011");

	result.push_back("110011");
	result.push_back("110110");
	result.push_back("101100");
	result.push_back("001101");
	result.push_back("011010");
	result.push_back("001110");
	result.push_back("101110");
	result.push_back("011100");
	result.push_back("110000");
	result.push_back("010111");
	result.push_back("011001");
	result.push_back("011110");
}

void GetFourCharCombination(std::vector<std::string> &result) {
	result.clear();
	result.push_back("232301");
	result.push_back("203320");
	result.push_back("013223");
	result.push_back("030211");
	result.push_back("220312");
	result.push_back("301023");
	result.push_back("011033");
	result.push_back("100210");
	result.push_back("021112");
	result.push_back("022312");
	result.push_back("003233");
	result.push_back("012203");
	result.push_back("110032");
	result.push_back("200020");
	result.push_back("203010");
	result.push_back("302111");
	result.push_back("203201");
	result.push_back("223033");
	result.push_back("132210");
	result.push_back("311012");
	result.push_back("021020");
	result.push_back("330012");
	result.push_back("001010");
	result.push_back("001201");
	result.push_back("212003");
	result.push_back("120113");
	result.push_back("303111");
	result.push_back("221102");
	result.push_back("202312");
	result.push_back("011101");
	result.push_back("313012");
	result.push_back("000102");
	result.push_back("000313");
	result.push_back("202320");
	result.push_back("301130");
	result.push_back("200203");
	result.push_back("220220");
	result.push_back("100220");
	result.push_back("003223");
	result.push_back("331121");
	result.push_back("223012");
	result.push_back("110033");
	result.push_back("332013");
	result.push_back("203200");
	result.push_back("203011");
	result.push_back("113113");
	result.push_back("123013");
	result.push_back("310130");
	result.push_back("023230");
	result.push_back("230100");
	result.push_back("331112");
	result.push_back("331303");
	result.push_back("220121");
	result.push_back("223120");
	result.push_back("002300");
	result.push_back("101301");
	result.push_back("132321");
	result.push_back("201001");
	result.push_back("111222");
	result.push_back("320002");
	result.push_back("031202");
	result.push_back("120101");
	result.push_back("310031");
	result.push_back("030102");
	result.push_back("223102");
	result.push_back("021111");
	result.push_back("013321");
	result.push_back("100030");
	result.push_back("022121");
	result.push_back("321033");
	result.push_back("211000");
	result.push_back("121302");
	result.push_back("000211");
	result.push_back("003220");
	result.push_back("033030");
	result.push_back("021231");
	result.push_back("202121");
	result.push_back("010033");
	result.push_back("221021");
	result.push_back("203331");
	result.push_back("333320");
	result.push_back("023132");
	result.push_back("130231");
	result.push_back("303003");
	result.push_back("221201");
	result.push_back("011121");
	result.push_back("221210");
	result.push_back("332301");
	result.push_back("013213");
	result.push_back("312320");
	result.push_back("321001");
	result.push_back("012011");
	result.push_back("332020");
	result.push_back("101000");
	result.push_back("033001");
	result.push_back("333030");
	result.push_back("300111");
	result.push_back("010011");
	result.push_back("310333");
	result.push_back("200121");
	result.push_back("312312");
	result.push_back("102011");
	result.push_back("302310");
	result.push_back("021100");
	result.push_back("003111");
	result.push_back("132011");
	result.push_back("123231");
	result.push_back("231003");
	result.push_back("120011");
	result.push_back("001013");
	result.push_back("001202");
	result.push_back("120110");
	result.push_back("011022");
	result.push_back("133013");
	result.push_back("020120");
	result.push_back("030132");
	result.push_back("022022");
	result.push_back("220310");
	result.push_back("031130");
	result.push_back("022303");
	result.push_back("012302");
	result.push_back("230202");
	result.push_back("301120");
	result.push_back("301313");
	result.push_back("112132");
	result.push_back("002002");
	result.push_back("103220");
	result.push_back("020230");
	result.push_back("013210");
	result.push_back("311030");
	result.push_back("011130");
	result.push_back("232323");
	result.push_back("221001");
	result.push_back("110333");
	result.push_back("323220");
	result.push_back("013201");
	result.push_back("232002");
	result.push_back("311300");
	result.push_back("120031");
	result.push_back("301002");
	result.push_back("103030");
	result.push_back("013332");
	result.push_back("201311");
	result.push_back("002120");
	result.push_back("233003");
	result.push_back("211203");
	result.push_back("101033");
	result.push_back("123002");
	result.push_back("303220");
	result.push_back("312012");
	result.push_back("133313");
	result.push_back("110112");
	result.push_back("110303");
	result.push_back("320231");
	result.push_back("313101");
	result.push_back("011203");
	result.push_back("221222");
	result.push_back("110330");
	result.push_back("011321");
	result.push_back("023103");
	result.push_back("301102");
	result.push_back("112312");
	result.push_back("313333");
	result.push_back("021121");
	result.push_back("230220");
	result.push_back("230013");
	result.push_back("321110");
	result.push_back("121210");
	result.push_back("021200");
	result.push_back("213033");
	result.push_back("212011");
	result.push_back("203103");
	result.push_back("222121");
	result.push_back("202120");
	result.push_back("331332");
	result.push_back("201100");
	result.push_back("023221");
	result.push_back("021203");
	result.push_back("333213");
	result.push_back("210100");
	result.push_back("203012");
	result.push_back("323130");
	result.push_back("201020");
	result.push_back("030112");
	result.push_back("320030");
	result.push_back("130031");
	result.push_back("102310");
	result.push_back("231331");
	result.push_back("130302");
	result.push_back("233210");
	result.push_back("001031");
	result.push_back("131133");
	result.push_back("300112");
	result.push_back("002210");
	result.push_back("202321");
	result.push_back("332010");
	result.push_back("301012");
	result.push_back("233211");
	result.push_back("031300");
	result.push_back("000213");
	result.push_back("313102");
	result.push_back("012111");
	result.push_back("310322");
	result.push_back("023211");
	result.push_back("230121");
	result.push_back("300001");
	result.push_back("030303");
	result.push_back("210202");
	result.push_back("203333");
	result.push_back("210013");
	result.push_back("332102");
	result.push_back("333033");
	result.push_back("020101");
	result.push_back("300303");
	result.push_back("100203");
	result.push_back("303030");
	result.push_back("302301");
	result.push_back("100033");
	result.push_back("122111");
	result.push_back("002313");
	result.push_back("020110");
	result.push_back("023010");
	result.push_back("210111");
	result.push_back("231100");
	result.push_back("131122");
	result.push_back("031100");
	result.push_back("221231");
	result.push_back("032013");
	result.push_back("220103");
	result.push_back("020301");
	result.push_back("233301");
	result.push_back("200301");
	result.push_back("203001");
	result.push_back("230103");
	result.push_back("211333");
	result.push_back("131012");
	result.push_back("013013");
	result.push_back("031023");
	result.push_back("012031");
	result.push_back("100103");
	result.push_back("020020");
	result.push_back("231030");
	result.push_back("300020");
	result.push_back("012100");
	result.push_back("033012");
	result.push_back("200200");
	result.push_back("321312");
	result.push_back("001032");
	result.push_back("031221");
	result.push_back("000310");
	result.push_back("103300");
	result.push_back("231201");
	result.push_back("311200");
	result.push_back("200320");
	result.push_back("123020");
	result.push_back("121110");
	result.push_back("100303");
	result.push_back("321111");
	result.push_back("133012");
	result.push_back("001132");
	result.push_back("130201");
	result.push_back("130010");
	result.push_back("333310");
	result.push_back("100330");
	result.push_back("031232");
	result.push_back("000303");
	result.push_back("313330");
	result.push_back("101310");
	result.push_back("223210");
	result.push_back("213000");
	result.push_back("100000");
	result.push_back("120132");
	result.push_back("003003");
	result.push_back("203330");
	result.push_back("003030");
	result.push_back("223021");
	result.push_back("120033");
	result.push_back("231021");
	result.push_back("011212");
	result.push_back("233333");
	result.push_back("231223");
	result.push_back("212112");
	result.push_back("101022");
	result.push_back("021001");
	result.push_back("021302");
	result.push_back("230331");
	result.push_back("032011");
	result.push_back("033103");
	result.push_back("102030");
	result.push_back("210001");
	result.push_back("030311");
	result.push_back("323212");
	result.push_back("323003");
	result.push_back("023111");
	result.push_back("210201");
	result.push_back("200212");
	result.push_back("221323");
	result.push_back("232030");
	result.push_back("210010");
	result.push_back("030300");
	result.push_back("331000");
	result.push_back("100110");
	result.push_back("031030");
	result.push_back("211320");
	result.push_back("020011");
	result.push_back("002003");
	result.push_back("232123");
	result.push_back("200011");
	result.push_back("031320");
	result.push_back("332210");
	result.push_back("002011");
	result.push_back("301021");
	result.push_back("010312");
	result.push_back("131220");
	result.push_back("022211");
	result.push_back("301223");
	result.push_back("303100");
	result.push_back("011020");
	result.push_back("233101");
	result.push_back("321202");
	result.push_back("330102");
	result.push_back("223303");
	result.push_back("220210");
	result.push_back("200101");
	result.push_back("102103");
	result.push_back("310122");
	result.push_back("312200");
	result.push_back("003303");
	result.push_back("200110");
	result.push_back("012320");
	result.push_back("331300");
	result.push_back("013021");
	result.push_back("323000");
	result.push_back("130130");
	result.push_back("101100");
	result.push_back("212122");
	result.push_back("002101");
	result.push_back("202301");
	result.push_back("002110");
	result.push_back("033302");
	result.push_back("213320");
	result.push_back("303302");
	result.push_back("130312");
	result.push_back("130103");
	result.push_back("023011");
	result.push_back("330302");
	result.push_back("203130");
	result.push_back("222202");
	result.push_back("032330");
	result.push_back("233030");
	result.push_back("002302");
	result.push_back("333002");
	result.push_back("022212");
	result.push_back("331033");
	result.push_back("333020");
	result.push_back("311033");
	result.push_back("020111");
	result.push_back("000112");
	result.push_back("033221");
	result.push_back("213230");
	result.push_back("002323");
	result.push_back("033023");
	result.push_back("031132");
	result.push_back("331102");
	result.push_back("113231");
	result.push_back("131110");
	result.push_back("303023");
	result.push_back("330023");
	result.push_back("001230");
	result.push_back("311023");
	result.push_back("101201");
	result.push_back("032030");
	result.push_back("002312");
	result.push_back("033210");
	result.push_back("330203");
	result.push_back("021330");
	result.push_back("023033");
	result.push_back("330230");
	result.push_back("222231");
	result.push_back("221033");
	result.push_back("012332");
	result.push_back("010223");
	result.push_back("211131");
	result.push_back("130331");
	result.push_back("001002");
	result.push_back("223322");
	result.push_back("132233");
	result.push_back("321212");
	result.push_back("030003");
	result.push_back("232012");
	result.push_back("322001");
	result.push_back("000012");
	result.push_back("312122");
	result.push_back("202302");
	result.push_back("130210");
	result.push_back("000120");
	result.push_back("023333");
	result.push_back("032020");
	result.push_back("333303");
	result.push_back("303222");
	result.push_back("022311");
	result.push_back("200111");
	result.push_back("103110");
	result.push_back("211033");
	result.push_back("213311");
	result.push_back("201011");
	result.push_back("023000");
	result.push_back("002103");
	result.push_back("010200");
	result.push_back("003101");
	result.push_back("201101");
	result.push_back("201301");
	result.push_back("211011");
	result.push_back("302311");
	result.push_back("201110");
	result.push_back("011201");
	result.push_back("110201");
	result.push_back("330333");
	result.push_back("002132");
	result.push_back("013320");
	result.push_back("022003");
	result.push_back("030232");
	result.push_back("312023");
	result.push_back("100332");
	result.push_back("311213");
	result.push_back("112001");
	result.push_back("000302");
	result.push_back("313013");
	result.push_back("112010");
	result.push_back("313033");
	result.push_back("200131");
	result.push_back("312100");
	result.push_back("011010");
	result.push_back("220212");
	result.push_back("101010");
	result.push_back("313100");
	result.push_back("023121");
	result.push_back("303010");
	result.push_back("020021");
	result.push_back("011123");
	result.push_back("013221");
	result.push_back("300322");
	result.push_back("110010");
	result.push_back("010132");
	result.push_back("132201");
	result.push_back("110100");
	result.push_back("131211");
	result.push_back("302102");
	result.push_back("310023");
	result.push_back("100102");
	result.push_back("102033");
	result.push_back("300120");
	result.push_back("012210");
	result.push_back("221000");
	result.push_back("320202");
	result.push_back("220022");
	result.push_back("230010");
	result.push_back("010113");
	result.push_back("131322");
	result.push_back("322021");
	result.push_back("102210");
	result.push_back("112033");
	result.push_back("032100");
	result.push_back("120210");
	result.push_back("231012");
	result.push_back("122010");
	result.push_back("012002");
	result.push_back("122311");
	result.push_back("001332");
	result.push_back("122100");
	result.push_back("032223");
	result.push_back("002233");
	result.push_back("220322");
	result.push_back("211313");
	result.push_back("031003");
	result.push_back("020233");
	result.push_back("233112");
	result.push_back("022033");
	result.push_back("022330");
	result.push_back("310201");
	result.push_back("310010");
	result.push_back("321220");
	result.push_back("122123");
	result.push_back("213203");
	result.push_back("020333");
	result.push_back("011330");
	result.push_back("232231");
	result.push_back("010211");
	result.push_back("132003");
	result.push_back("130000");
	result.push_back("213101");
	result.push_back("111233");
	result.push_back("103021");
	result.push_back("200333");
	result.push_back("300031");
	result.push_back("131021");
	result.push_back("202012");
	result.push_back("233322");
	result.push_back("231232");
	result.push_back("123303");
	result.push_back("333000");
	result.push_back("121220");
	result.push_back("213103");
	result.push_back("203033");
	result.push_back("323030");
	result.push_back("132222");
	result.push_back("221202");
	result.push_back("203303");
	result.push_back("010102");
	result.push_back("313233");
	result.push_back("103023");
	result.push_back("111330");
	result.push_back("021010");
	result.push_back("313322");
	result.push_back("002310");
	result.push_back("003230");
	result.push_back("220211");
	result.push_back("012200");
	result.push_back("020310");
	result.push_back("100022");
	result.push_back("023100");
	result.push_back("030113");
	result.push_back("113010");
	result.push_back("200113");
	result.push_back("320303");
	result.push_back("022313");
	result.push_back("013130");
	result.push_back("120112");
	result.push_back("320011");
	result.push_back("003122");
	result.push_back("333101");
	result.push_back("210102");
	result.push_back("303231");
	result.push_back("020323");
	result.push_back("020013");
	result.push_back("023023");
	result.push_back("002333");
	result.push_back("023203");
	result.push_back("022010");
	result.push_back("113110");
	result.push_back("030233");
	result.push_back("003011");
	result.push_back("133213");
	result.push_back("021202");
	result.push_back("102200");
	result.push_back("231220");
	result.push_back("201202");
	result.push_back("023102");
	result.push_back("320213");
	result.push_back("312010");
	result.push_back("001231");
	result.push_back("212002");
	result.push_back("313130");
	result.push_back("212020");
	result.push_back("000203");
	result.push_back("003203");
	result.push_back("000001");
	result.push_back("012231");
	result.push_back("000010");
	result.push_back("013102");
	result.push_back("220301");
	result.push_back("230033");
	result.push_back("331230");
	result.push_back("033003");
	result.push_back("003201");
	result.push_back("002102");
	result.push_back("022302");
	result.push_back("022023");
	result.push_back("101231");
	result.push_back("030201");
	result.push_back("332100");
	result.push_back("032001");
	result.push_back("230112");
	result.push_back("012122");
	result.push_back("131323");
	result.push_back("310212");
	result.push_back("221113");
	result.push_back("230330");
	result.push_back("103121");
	result.push_back("032010");
	result.push_back("003010");
	result.push_back("330000");
	result.push_back("202322");
	result.push_back("002021");
	result.push_back("312102");
	result.push_back("231311");
	result.push_back("030010");
	result.push_back("110301");
	result.push_back("100222");
	result.push_back("012132");
	result.push_back("130131");
	result.push_back("031231");
	result.push_back("330033");
	result.push_back("030100");
	result.push_back("033330");
	result.push_back("002113");
	result.push_back("233122");
	result.push_back("120301");
	result.push_back("021030");
	result.push_back("303330");
	result.push_back("031303");
	result.push_back("321122");
	result.push_back("330330");
	result.push_back("120200");
	result.push_back("103331");
	result.push_back("123033");
	result.push_back("033313");
	result.push_back("333300");
	result.push_back("210310");
	result.push_back("010220");
	result.push_back("033032");
	result.push_back("030332");
	result.push_back("232200");
	result.push_back("210022");
	result.push_back("102130");
	result.push_back("000020");
	result.push_back("210211");
	result.push_back("023013");
	result.push_back("000200");
	result.push_back("201010");
	result.push_back("013322");
	result.push_back("032313");
	result.push_back("302313");
	result.push_back("320313");
	result.push_back("010213");
	result.push_back("022233");
	result.push_back("331232");
	result.push_back("321011");
	result.push_back("102211");
	result.push_back("202211");
	result.push_back("220323");
	result.push_back("323013");
	result.push_back("333221");
	result.push_back("111322");
	result.push_back("323103");
	result.push_back("130323");
	result.push_back("022332");
	result.push_back("122002");
	result.push_back("011000");
	result.push_back("002200");
	result.push_back("312110");
	result.push_back("112031");
	result.push_back("012300");
	result.push_back("300131");
	result.push_back("002130");
	result.push_back("312131");
	result.push_back("131032");
	result.push_back("020130");
	result.push_back("000311");
	result.push_back("000100");
	result.push_back("300330");
	result.push_back("101002");
	result.push_back("103122");
	result.push_back("103311");
	result.push_back("121101");
	result.push_back("001033");
	result.push_back("021300");
	result.push_back("020131");
	result.push_back("100201");
	result.push_back("212133");
	result.push_back("101223");
	result.push_back("302010");
	result.push_back("221331");
	result.push_back("201031");
	result.push_back("201310");
	result.push_back("033000");
	result.push_back("213002");
	result.push_back("010010");
	result.push_back("330202");
	result.push_back("021221");
	result.push_back("103322");
	result.push_back("222031");
	result.push_back("212310");
	result.push_back("010100");
	result.push_back("133002");
	result.push_back("223000");
	result.push_back("333230");
	result.push_back("330212");
	result.push_back("002202");
	result.push_back("032102");
	result.push_back("203311");
	result.push_back("001100");
	result.push_back("020302");
	result.push_back("330003");
	result.push_back("102020");
	result.push_back("210222");
	result.push_back("330030");
	result.push_back("222131");
	result.push_back("233220");
	result.push_back("201132");
	result.push_back("330300");
	result.push_back("311220");
	result.push_back("103232");
	result.push_back("203121");
	result.push_back("012123");
	result.push_back("001222");
	result.push_back("102230");
	result.push_back("123321");
	result.push_back("231210");
	result.push_back("302013");
	result.push_back("222022");
	result.push_back("023122");
	result.push_back("033011");
	result.push_back("001310");
	result.push_back("303123");
	result.push_back("320013");
	result.push_back("222312");
	result.push_back("110213");
	result.push_back("320103");
	result.push_back("300200");
	result.push_back("311020");
	result.push_back("212220");
	result.push_back("130100");
	result.push_back("032231");
	result.push_back("102001");
	result.push_back("210113");
	result.push_back("110332");
	result.push_back("300101");
	result.push_back("312221");
	result.push_back("323221");
	result.push_back("320130");
	result.push_back("313231");
	result.push_back("330103");
	result.push_back("133021");
	result.push_back("321203");
	result.push_back("230322");
	result.push_back("130030");
	result.push_back("030030");
	result.push_back("201300");
	result.push_back("201111");
	result.push_back("123302");
	result.push_back("211211");
	result.push_back("011220");
	result.push_back("000000");
	result.push_back("033101");
	result.push_back("110132");
	result.push_back("222011");
	result.push_back("031323");
	result.push_back("002131");
	result.push_back("122210");
	result.push_back("203101");
	result.push_back("222101");
	result.push_back("222110");
	result.push_back("113312");
	result.push_back("210123");
	result.push_back("000110");
	result.push_back("000323");
	result.push_back("300320");
	result.push_back("021310");
	result.push_back("232221");
	result.push_back("202102");
	result.push_back("131302");
	result.push_back("003023");
	result.push_back("010201");
	result.push_back("211112");
	result.push_back("001003");
	result.push_back("010002");
	result.push_back("211321");
	result.push_back("202222");
	result.push_back("221032");
	result.push_back("111102");
	result.push_back("123100");
	result.push_back("011303");
	result.push_back("022101");
	result.push_back("031031");
	result.push_back("032033");
	result.push_back("211223");
	result.push_back("101303");
	result.push_back("033213");
	result.push_back("313222");
	result.push_back("020202");
	result.push_back("012222");
	result.push_back("113003");
	result.push_back("233010");
	result.push_back("023120");
	result.push_back("113030");
	result.push_back("032310");
	result.push_back("211001");
	result.push_back("001200");
	result.push_back("310022");
	result.push_back("032031");
	result.push_back("201030");
	result.push_back("111103");
	result.push_back("010331");
	result.push_back("331220");
	result.push_back("331013");
	result.push_back("012000");
	result.push_back("030200");
	result.push_back("133223");
	result.push_back("322003");
	result.push_back("103003");
	result.push_back("302000");
	result.push_back("010310");
	result.push_back("200130");
	result.push_back("021003");
	result.push_back("303020");
	result.push_back("130003");
	result.push_back("003001");
	result.push_back("030001");
	result.push_back("223320");
	result.push_back("023301");
	result.push_back("123320");
	result.push_back("000130");
	result.push_back("100133");
	result.push_back("213020");
	result.push_back("112003");
	result.push_back("312003");
	result.push_back("031220");
	result.push_back("330303");
	result.push_back("320033");
	result.push_back("203301");
	result.push_back("230301");
	result.push_back("030000");
	result.push_back("301013");
	result.push_back("233001");
	result.push_back("303022");
	result.push_back("332200");
	result.push_back("013031");
	result.push_back("032303");
	result.push_back("121301");
	result.push_back("002320");
	result.push_back("233311");
	result.push_back("302303");
	result.push_back("211003");
	result.push_back("003211");
	result.push_back("320010");
	result.push_back("032302");
	result.push_back("000220");
	result.push_back("200002");
	result.push_back("001102");
	result.push_back("212102");
	result.push_back("001313");
	result.push_back("022202");
	result.push_back("100230");
	result.push_back("011202");
	result.push_back("000022");
	result.push_back("322211");
	result.push_back("213212");
	result.push_back("121122");
	result.push_back("002301");
	result.push_back("122103");
	result.push_back("030002");
	result.push_back("122312");
	result.push_back("131101");
	result.push_back("310030");
	result.push_back("322000");
	result.push_back("000202");
	result.push_back("022322");
	result.push_back("321232");
	result.push_back("220123");
	result.push_back("023232");
	result.push_back("001211");
	result.push_back("223203");
	result.push_back("121321");
	result.push_back("133333");
	result.push_back("321313");
	result.push_back("030230");
	result.push_back("012310");
	result.push_back("012101");
	result.push_back("133120");
	result.push_back("012110");
	result.push_back("301233");
	result.push_back("302031");
	result.push_back("221310");
	result.push_back("310103");
	result.push_back("110123");
	result.push_back("110310");
	result.push_back("002030");
	result.push_back("320031");
	result.push_back("112331");
	result.push_back("011012");
	result.push_back("121022");
	result.push_back("232311");
	result.push_back("001301");
	result.push_back("300002");
	result.push_back("310112");
	result.push_back("102133");
	result.push_back("120332");
	result.push_back("331202");
	result.push_back("012112");
	result.push_back("320301");
	result.push_back("013222");
	result.push_back("030210");
	result.push_back("113322");
	result.push_back("303112");
	result.push_back("201032");
	result.push_back("320310");
	result.push_back("210030");
	result.push_back("030320");
	result.push_back("313121");
	result.push_back("231102");
	result.push_back("210300");
	result.push_back("313331");
	result.push_back("030202");
	result.push_back("330010");
	result.push_back("023332");
	result.push_back("020320");
	result.push_back("103330");
	result.push_back("102332");
	result.push_back("022002");
	result.push_back("120201");
	result.push_back("123032");
	result.push_back("221122");
	result.push_back("200202");
	result.push_back("301131");
	result.push_back("120120");
	result.push_back("212203");
	result.push_back("310021");
	result.push_back("201033");
	result.push_back("330223");
	result.push_back("023303");
	result.push_back("320100");
	result.push_back("330232");
	result.push_back("023330");
	result.push_back("102000");
	result.push_back("000033");
	result.push_back("011231");
	result.push_back("110221");
	result.push_back("203113");
	result.push_back("010123");
	result.push_back("013032");
	result.push_back("201330");
	result.push_back("120000");
	result.push_back("102021");
	result.push_back("002133");
	result.push_back("302213");
	result.push_back("110200");
	result.push_back("321321");
	result.push_back("102123");
	result.push_back("003323");
	result.push_back("102202");
	result.push_back("010332");
	result.push_back("103032");
	result.push_back("202201");
	result.push_back("103302");
	result.push_back("112120");
	result.push_back("013123");
	result.push_back("110222");
	result.push_back("330130");
	result.push_back("123000");
	result.push_back("021212");
	result.push_back("121130");
	result.push_back("002111");
	result.push_back("301121");
	result.push_back("201333");
	result.push_back("300301");
	result.push_back("220132");
	result.push_back("103320");
	result.push_back("110020");
	result.push_back("030221");
	result.push_back("312030");
	result.push_back("020022");
	result.push_back("111232");
	result.push_back("022222");
	result.push_back("200022");
	result.push_back("112112");
	result.push_back("211110");
	result.push_back("100113");
	result.push_back("333021");
	result.push_back("200220");
	result.push_back("022020");
	result.push_back("120102");
	result.push_back("001312");
	result.push_back("001103");
	result.push_back("123233");
	result.push_back("033031");
	result.push_back("103012");
	result.push_back("000023");
	result.push_back("112231");
	result.push_back("202323");
	result.push_back("020201");
	result.push_back("013012");
	result.push_back("212023");
	result.push_back("302122");
	result.push_back("030130");
	result.push_back("301122");
	result.push_back("013120");
	result.push_back("300302");
	result.push_back("032213");
	result.push_back("120311");
	result.push_back("322013");
	result.push_back("230213");
	result.push_back("322103");
	result.push_back("230002");
	result.push_back("032131");
	result.push_back("322130");
	result.push_back("300230");
	result.push_back("321310");
	result.push_back("233013");
	result.push_back("000301");
	result.push_back("022323");
	result.push_back("223023");
	result.push_back("102113");
	result.push_back("223230");
	result.push_back("233300");
	result.push_back("000210");
	result.push_back("132312");
	result.push_back("011223");
	result.push_back("110000");
	result.push_back("213112");
	result.push_back("001233");
	result.push_back("010233");
	result.push_back("132021");
	result.push_back("012033");
	result.push_back("332123");
	result.push_back("103221");
	result.push_back("011131");
	result.push_back("012303");
	result.push_back("010122");
	result.push_back("012330");
	result.push_back("301303");
	result.push_back("220313");
	result.push_back("230021");
	result.push_back("100200");
	result.push_back("221020");
	result.push_back("112220");
	result.push_back("331021");
	result.push_back("101122");
	result.push_back("131312");
	result.push_back("030321");
	result.push_back("210031");
	result.push_back("111220");
	result.push_back("300321");
	result.push_back("103010");
	result.push_back("211101");
	result.push_back("013001");
	result.push_back("303021");
	result.push_back("323312");
	result.push_back("233033");
	result.push_back("123113");
	result.push_back("211310");
	result.push_back("031000");
	result.push_back("303201");
	result.push_back("303210");
	result.push_back("130022");
	result.push_back("233223");
	result.push_back("133113");
	result.push_back("011113");
	result.push_back("321010");
	result.push_back("312120");
	result.push_back("333211");
	result.push_back("001330");
	result.push_back("100011");
	result.push_back("100101");
	result.push_back("302101");
	result.push_back("233221");
	result.push_back("320220");
	result.push_back("303202");
	result.push_back("022102");
	result.push_back("301220");
	result.push_back("310220");
	result.push_back("312020");
	result.push_back("110300");
	result.push_back("310131");
	result.push_back("002020");
	result.push_back("200120");
	result.push_back("220231");
	result.push_back("003311");
	result.push_back("133210");
	result.push_back("311002");
	result.push_back("000212");
	result.push_back("031102");
	result.push_back("033110");
	result.push_back("223302");
	result.push_back("121020");
	result.push_back("313103");
	result.push_back("003100");
	result.push_back("120321");
	result.push_back("032103");
	result.push_back("122023");
	result.push_back("300233");
	result.push_back("120323");
	result.push_back("131320");
	result.push_back("022113");
	result.push_back("200313");
	result.push_back("100301");
	result.push_back("302033");
	result.push_back("113100");
	result.push_back("300103");
	result.push_back("302330");
	result.push_back("320132");
	result.push_back("001000");
	result.push_back("333011");
	result.push_back("220202");
	result.push_back("000003");
	result.push_back("312203");
	result.push_back("212030");
	result.push_back("010000");
	result.push_back("331221");
	result.push_back("331012");
	result.push_back("130020");
	result.push_back("010020");
	result.push_back("023112");
	result.push_back("101233");
	result.push_back("122203");
	result.push_back("203112");
	result.push_back("021320");
	result.push_back("111000");
	result.push_back("202122");
	result.push_back("231120");
	result.push_back("030023");
	result.push_back("323210");
	result.push_back("323001");
	result.push_back("033132");
	result.push_back("013121");
	result.push_back("101101");
	result.push_back("030131");
	result.push_back("313002");
	result.push_back("110101");
	result.push_back("121003");
	result.push_back("011002");
	result.push_back("111001");
	result.push_back("202000");
	result.push_back("122231");
	result.push_back("111010");
	result.push_back("011310");
	result.push_back("310310");
	result.push_back("301103");
	result.push_back("020132");
	result.push_back("313202");
	result.push_back("013022");
	result.push_back("021032");
	result.push_back("310133");
	result.push_back("320210");
	result.push_back("021031");
	result.push_back("130121");
	result.push_back("023020");
	result.push_back("101212");
	result.push_back("210301");
	result.push_back("222220");
	result.push_back("000230");
	result.push_back("233320");
	result.push_back("131003");
	result.push_back("330210");
	result.push_back("330001");
	result.push_back("323222");
	result.push_back("132100");
	result.push_back("003321");
	result.push_back("220030");
	result.push_back("130112");
	result.push_back("033021");
	result.push_back("231200");
	result.push_back("033201");
	result.push_back("303203");
	result.push_back("133200");
	result.push_back("032300");
	result.push_back("033111");
	result.push_back("330133");
	result.push_back("023130");
	result.push_back("033300");
	result.push_back("020023");
	result.push_back("130211");
	result.push_back("121203");
	result.push_back("303300");
	result.push_back("020003");
	result.push_back("310001");
	result.push_back("012221");
	result.push_back("013300");
	result.push_back("020203");
	result.push_back("010022");
	result.push_back("330021");
	result.push_back("330201");
	result.push_back("110003");
	result.push_back("332001");
	result.push_back("202332");
	result.push_back("220332");
	result.push_back("213032");
	result.push_back("312222");
	result.push_back("320201");
	result.push_back("313211");
	result.push_back("120310");
	result.push_back("011100");
	result.push_back("201023");
	result.push_back("300011");
	result.push_back("311202");
	result.push_back("223032");
	result.push_back("231221");
	result.push_back("233331");
	result.push_back("010300");
	result.push_back("001020");
	result.push_back("001213");
	result.push_back("203213");
	result.push_back("203020");
	result.push_back("022200");
	result.push_back("103222");
	result.push_back("002000");
	result.push_back("310221");
	result.push_back("023002");
	result.push_back("201013");
	result.push_back("132110");
	result.push_back("020112");
	result.push_back("102333");
	result.push_back("023001");
	result.push_back("230001");
	result.push_back("230210");
	result.push_back("233002");
	result.push_back("202011");
	result.push_back("120001");
	result.push_back("231101");
	result.push_back("202200");
	result.push_back("220200");
	result.push_back("210223");
	result.push_back("330123");
	result.push_back("202021");
	result.push_back("011230");
	result.push_back("202030");
	result.push_back("311330");
	result.push_back("222211");
	result.push_back("032323");
	result.push_back("222000");
	result.push_back("033333");
	result.push_back("230303");
	result.push_back("023012");
	result.push_back("100233");
	result.push_back("102320");
	result.push_back("110233");
	result.push_back("132103");
	result.push_back("000021");
	result.push_back("033312");
	result.push_back("130221");
	result.push_back("222303");
	result.push_back("001120");
	result.push_back("010330");
	result.push_back("331100");
	result.push_back("203322");
	result.push_back("221300");
	result.push_back("013030");
	result.push_back("331022");
	result.push_back("023133");
	result.push_back("011001");
	result.push_back("320330");
	result.push_back("121023");
	result.push_back("022031");
	result.push_back("031101");
	result.push_back("011013");
	result.push_back("012113");
	result.push_back("133303");
	result.push_back("300003");
	result.push_back("033100");
	result.push_back("133112");
	result.push_back("032012");
	result.push_back("210330");
	result.push_back("200323");
	result.push_back("021301");
	result.push_back("212213");
	result.push_back("121013");
	result.push_back("012013");
	result.push_back("322322");
	result.push_back("012312");
	result.push_back("012103");
	result.push_back("012130");
	result.push_back("010120");
	result.push_back("302030");
	result.push_back("332131");
	result.push_back("103310");
	result.push_back("110120");
	result.push_back("123030");
	result.push_back("122110");
	result.push_back("302300");
	result.push_back("333133");
	result.push_back("013212");
	result.push_back("020311");
	result.push_back("130310");
	result.push_back("103201");
	result.push_back("322201");
	result.push_back("130113");
	result.push_back("112030");
	result.push_back("311103");
	result.push_back("200311");
	result.push_back("322023");
	result.push_back("203110");
	result.push_back("032111");
	result.push_back("320111");
	result.push_back("013003");
	result.push_back("321101");
	result.push_back("111113");
	result.push_back("122220");
	result.push_back("003132");
	result.push_back("211322");
	result.push_back("303321");
	result.push_back("010320");
	result.push_back("031032");
	result.push_back("220230");
	result.push_back("031302");
	result.push_back("211221");
	result.push_back("022030");
	result.push_back("012202");
	result.push_back("312210");
	result.push_back("013103");
	result.push_back("103120");
	result.push_back("220300");
	result.push_back("010133");
	result.push_back("101330");
	result.push_back("103103");
	result.push_back("131030");
	result.push_back("323300");
	result.push_back("032112");
	result.push_back("102010");
	result.push_back("303301");
	result.push_back("022012");
	result.push_back("303200");
	result.push_back("100010");
	result.push_back("003031");
	result.push_back("100100");
	result.push_back("121103");
	result.push_back("013231");
	result.push_back("102302");
	result.push_back("221313");
	result.push_back("120302");
	result.push_back("222010");
	result.push_back("212331");
	result.push_back("030011");
	result.push_back("332222");
	result.push_back("303000");
	result.push_back("211331");
	result.push_back("330301");
	result.push_back("031021");
	result.push_back("310210");
	result.push_back("022013");
	result.push_back("200012");
	result.push_back("300310");
	result.push_back("233012");
	result.push_back("010311");
	result.push_back("100311");
	result.push_back("320221");
	result.push_back("103011");
	result.push_back("132102");
	result.push_back("132302");
	result.push_back("103101");
	result.push_back("111111");
	result.push_back("001133");
	result.push_back("113333");
	result.push_back("032321");
	result.push_back("033112");
	result.push_back("330112");
	result.push_back("302221");
	result.push_back("331120");
	result.push_back("123132");
	result.push_back("132020");
	result.push_back("103230");
	result.push_back("202210");
	result.push_back("113300");
	result.push_back("120002");
	result.push_back("031333");
	result.push_back("320300");
	result.push_back("102301");
	result.push_back("131303");
	result.push_back("322123");
	result.push_back("000332");
	result.push_back("002222");
	result.push_back("020313");
	result.push_back("212212");
	result.push_back("112323");
	result.push_back("210312");
	result.push_back("210103");
	result.push_back("121012");
	result.push_back("203202");
	result.push_back("203013");
	result.push_back("211312");
	result.push_back("211103");
	result.push_back("220012");
	result.push_back("031002");
	result.push_back("220102");
	result.push_back("001212");
	result.push_back("220120");
	result.push_back("002012");
	result.push_back("230230");
	result.push_back("000312");
	result.push_back("000103");
	result.push_back("131231");
	result.push_back("001030");
	result.push_back("021332");
	result.push_back("020012");
	result.push_back("130220");
	result.push_back("230130");
	result.push_back("131022");
	result.push_back("210231");
	result.push_back("312323");
	result.push_back("122020");
	result.push_back("002330");
	result.push_back("020102");
	result.push_back("130320");
	result.push_back("111202");
	result.push_back("133020");
	result.push_back("313122");
	result.push_back("203111");
	result.push_back("210213");
	result.push_back("210020");
	result.push_back("301032");
	result.push_back("030330");
	result.push_back("103321");
	result.push_back("021002");
	result.push_back("103231");
	result.push_back("132031");
	result.push_back("132301");
	result.push_back("132310");
	result.push_back("112321");
	result.push_back("103213");
	result.push_back("310300");
	result.push_back("021101");
	result.push_back("121300");
	result.push_back("002220");
	result.push_back("020232");
	result.push_back("210101");
	result.push_back("131212");
	result.push_back("022133");
	result.push_back("202203");
	result.push_back("211010");
	result.push_back("310032");
	result.push_back("232222");
	result.push_back("201002");
	result.push_back("311223");
	result.push_back("231121");
	result.push_back("003002");
	result.push_back("202101");
	result.push_back("001131");
	result.push_back("132010");
	result.push_back("122332");
	result.push_back("003020");
	result.push_back("011320");
	result.push_back("003103");
	result.push_back("030101");
	result.push_back("101320");
	result.push_back("323303");
	result.push_back("110320");
	result.push_back("113020");
	result.push_back("111311");
	result.push_back("113200");
	result.push_back("212010");
	result.push_back("030020");
	result.push_back("011302");
	result.push_back("311000");
	result.push_back("101302");
	result.push_back("110302");
	result.push_back("101030");
	result.push_back("221333");
	result.push_back("111221");
	result.push_back("031201");
	result.push_back("113002");
	result.push_back("120103");
	result.push_back("123213");
	result.push_back("021131");
	result.push_back("221110");
	result.push_back("201131");
	result.push_back("210131");
	result.push_back("100310");
	result.push_back("103102");
	result.push_back("230321");
	result.push_back("222331");
	result.push_back("211031");
	result.push_back("322200");
	result.push_back("211301");
	result.push_back("031011");
	result.push_back("200310");
	result.push_back("010323");
	result.push_back("021133");
	result.push_back("100323");
	result.push_back("103203");
	result.push_back("120303");
	result.push_back("030333");
	result.push_back("210210");
	result.push_back("210023");
	result.push_back("001303");
	result.push_back("303130");
	result.push_back("120330");
	result.push_back("100020");
	result.push_back("130230");
	result.push_back("133030");
	result.push_back("023212");
	result.push_back("003302");
	result.push_back("222310");
	result.push_back("030302");
	result.push_back("210012");
	result.push_back("131230");
	result.push_back("113021");
	result.push_back("033002");
	result.push_back("033020");
	result.push_back("031122");
	result.push_back("031310");
	result.push_back("311022");
	result.push_back("000221");
	result.push_back("201203");
	result.push_back("322122");
	result.push_back("300231");
	result.push_back("220311");
	result.push_back("032101");
	result.push_back("112012");
	result.push_back("203031");
	result.push_back("000300");
	result.push_back("200210");
	result.push_back("032110");
	result.push_back("112233");
	result.push_back("300113");
	result.push_back("101131");
	result.push_back("001113");
	result.push_back("133103");
	result.push_back("011103");
	result.push_back("302113");
	result.push_back("202022");
	result.push_back("303002");
	result.push_back("310012");
	result.push_back("031013");
	result.push_back("211303");
	result.push_back("320021");
	result.push_back("003022");
	result.push_back("202220");
	result.push_back("102220");
	result.push_back("030022");
	result.push_back("221030");
	result.push_back("111100");
	result.push_back("030220");
	result.push_back("321120");
	result.push_back("011311");
	result.push_back("120123");
	result.push_back("112013");
	result.push_back("102233");
	result.push_back("121230");
	result.push_back("330213");
	result.push_back("221220");
	result.push_back("122012");
	result.push_back("330002");
	result.push_back("330020");
	result.push_back("220010");
	result.push_back("123232");
	result.push_back("220303");
	result.push_back("022310");
	result.push_back("011031");
	result.push_back("202310");
	result.push_back("221100");
	result.push_back("110323");
	result.push_back("212301");
	result.push_back("223010");
	result.push_back("223100");
	result.push_back("122030");
	result.push_back("102303");
	result.push_back("123003");
	result.push_back("022321");
	result.push_back("220321");
	result.push_back("101020");
	result.push_back("223201");
	result.push_back("001232");
	result.push_back("031230");
	result.push_back("102112");
	result.push_back("201231");
	result.push_back("121102");
	result.push_back("011323");
	result.push_back("122130");
	result.push_back("121120");
	result.push_back("033301");
	result.push_back("333330");
	result.push_back("333001");
	result.push_back("333010");
	result.push_back("132111");
	result.push_back("232110");
	result.push_back("010303");
	result.push_back("123330");
	result.push_back("330200");
	result.push_back("302100");
	result.push_back("333322");
	result.push_back("003301");
	result.push_back("111331");
	result.push_back("210200");
	result.push_back("030301");
	result.push_back("210011");
	result.push_back("102330");
	result.push_back("333102");
	result.push_back("033010");
	result.push_back("010001");
	result.push_back("031133");
	result.push_back("022230");
	result.push_back("301133");
	result.push_back("100312");
	result.push_back("311303");
	result.push_back("301211");
	result.push_back("131201");
	result.push_back("113032");
	result.push_back("102203");
	result.push_back("120203");
	result.push_back("122003");
	result.push_back("200102");
	result.push_back("322121");
	result.push_back("201200");
	result.push_back("132120");
	result.push_back("000002");
	result.push_back("001001");
	result.push_back("311120");
	result.push_back("013302");
	result.push_back("022011");
	result.push_back("122230");
	result.push_back("220011");
	result.push_back("012321");
	result.push_back("033121");
	result.push_back("000223");
	result.push_back("220101");
	result.push_back("330031");
	result.push_back("220110");
	result.push_back("100213");
	result.push_back("301001");
	result.push_back("101203");
	result.push_back("301010");
	result.push_back("130032");
	result.push_back("103031");
	result.push_back("332012");
	result.push_back("230332");
	result.push_back("030312");
	result.push_back("210002");
	result.push_back("032132");
	result.push_back("301123");
	result.push_back("231300");
	result.push_back("303013");
	result.push_back("011300");
	result.push_back("003300");
	result.push_back("230300");
	result.push_back("100202");
	result.push_back("033133");
	result.push_back("303133");
	result.push_back("331330");
	result.push_back("212000");
	result.push_back("231302");
	result.push_back("232210");
	result.push_back("200010");
	result.push_back("010230");
	result.push_back("133122");
	result.push_back("322131");
	result.push_back("001110");
	result.push_back("000030");
	result.push_back("302232");
	result.push_back("300030");
	result.push_back("200211");
	result.push_back("031110");
	result.push_back("020212");
	result.push_back("300300");
	result.push_back("033320");
	result.push_back("332023");
	result.push_back("022220");
	result.push_back("303320");
	result.push_back("221322");
	result.push_back("220223");
	result.push_back("330320");
	result.push_back("323301");
	result.push_back("003000");
	result.push_back("332110");
	result.push_back("200221");
	result.push_back("321210");
	result.push_back("301112");
	result.push_back("333200");
	result.push_back("310202");
	result.push_back("310013");
	result.push_back("002010");
	result.push_back("123130");
	result.push_back("203120");
	result.push_back("020010");
	result.push_back("312303");
	result.push_back("020100");
	result.push_back("320320");
	result.push_back("010203");
	result.push_back("200100");
	result.push_back("031223");
	result.push_back("310223");
	result.push_back("312230");
	result.push_back("023322");
	result.push_back("021103");
	result.push_back("112332");
	result.push_back("201103");
	result.push_back("211030");
	result.push_back("313023");
	result.push_back("120320");
	result.push_back("201000");
	result.push_back("021011");
	result.push_back("201102");
	result.push_back("010030");
	result.push_back("233100");
	result.push_back("100300");
	result.push_back("303110");
	result.push_back("022122");
	result.push_back("220122");
	result.push_back("213022");
	result.push_back("102131");
	result.push_back("221022");
	result.push_back("013323");
	result.push_back("012323");
	result.push_back("202311");
	result.push_back("212300");
	result.push_back("013113");
	result.push_back("223011");
	result.push_back("133301");
	result.push_back("000011");
	result.push_back("223101");
	result.push_back("223110");
	result.push_back("003231");
	result.push_back("030231");
	result.push_back("100322");
	result.push_back("032301");
	result.push_back("330110");
	result.push_back("331010");
	result.push_back("033033");
	result.push_back("111323");
	result.push_back("023201");
	result.push_back("303033");
	result.push_back("323010");
	result.push_back("323100");
	result.push_back("213201");
	result.push_back("132001");
	result.push_back("103211");
	result.push_back("103000");
	result.push_back("000031");
	result.push_back("130012");
	result.push_back("310301");
	result.push_back("130102");
	result.push_back("230030");
	result.push_back("130120");
	result.push_back("003330");
	result.push_back("220203");
	result.push_back("002013");
	result.push_back("122021");
	result.push_back("020103");
	result.push_back("002023");
	result.push_back("113313");
	result.push_back("332033");
	result.push_back("013200");
	result.push_back("002203");
	result.push_back("330013");
	result.push_back("002230");
	result.push_back("132000");
	result.push_back("300010");
	result.push_back("032122");
	result.push_back("213221");
	result.push_back("123230");
	result.push_back("211200");
	result.push_back("300210");
	result.push_back("301333");
	result.push_back("210130");
	result.push_back("333003");
	result.push_back("313303");
	result.push_back("303012");
	result.push_back("320001");
	result.push_back("312013");
	result.push_back("330120");
	result.push_back("020312");
	result.push_back("323033");
	result.push_back("103022");
	result.push_back("130202");
	result.push_back("100320");
	result.push_back("203032");
	result.push_back("022000");
	result.push_back("030103");
	result.push_back("020032");
	result.push_back("301003");
	result.push_back("001122");
	result.push_back("301030");
	result.push_back("112130");
	result.push_back("310003");
	result.push_back("211132");
	result.push_back("031212");
	result.push_back("202013");
	result.push_back("301212");
	result.push_back("320101");
	result.push_back("230133");
	result.push_back("023030");
	result.push_back("203030");
	result.push_back("100002");
	result.push_back("210203");
	result.push_back("013010");
	result.push_back("013100");
	result.push_back("013313");
	result.push_back("210221");
	result.push_back("010210");
	result.push_back("331231");
	result.push_back("323131");
	result.push_back("103313");
	result.push_back("201133");
	result.push_back("130313");
	result.push_back("123012");
	result.push_back("133130");
	result.push_back("012030");
	result.push_back("012322");
	result.push_back("021233");
	result.push_back("001320");
	result.push_back("122233");
	result.push_back("213333");
	result.push_back("102013");
	result.push_back("311321");
	result.push_back("303213");
	result.push_back("100132");
	result.push_back("020002");
	result.push_back("023032");
	result.push_back("101211");
	result.push_back("230032");
	result.push_back("230302");
	result.push_back("312201");
	result.push_back("130021");
	result.push_back("010021");
	result.push_back("121112");
	result.push_back("230320");
	result.push_back("020222");
	result.push_back("031321");
	result.push_back("331110");
	result.push_back("001123");
	result.push_back("331301");
	result.push_back("013020");
	result.push_back("122313");
	result.push_back("322302");
	result.push_back("000232");
	result.push_back("002032");
	result.push_back("203233");
	result.push_back("011021");
	result.push_back("331131");
	result.push_back("112020");
	result.push_back("101021");
	result.push_back("110021");
	result.push_back("203003");
	result.push_back("110210");
	result.push_back("203231");
	result.push_back("020200");
	result.push_back("110322");
	result.push_back("012333");
	result.push_back("333333");
	result.push_back("200132");
	result.push_back("120333");
	result.push_back("303120");
	result.push_back("131023");
	result.push_back("131210");
	result.push_back("022203");
	result.push_back("222212");
	result.push_back("222003");
	result.push_back("222030");
	result.push_back("010003");
	result.push_back("323031");
	result.push_back("212302");
	result.push_back("120331");
	result.push_back("221012");
	result.push_back("103020");
	result.push_back("103200");
	result.push_back("302210");
	result.push_back("311201");
	result.push_back("300012");
	result.push_back("303333");
	result.push_back("031322");
	result.push_back("020113");
	result.push_back("233132");
	result.push_back("223330");
	result.push_back("130200");
	result.push_back("323011");
	result.push_back("133123");
	result.push_back("101300");
	result.push_back("113000");
	result.push_back("330100");
	result.push_back("213223");
	result.push_back("131000");
	result.push_back("222322");
	result.push_back("000101");
	result.push_back("013132");
	result.push_back("030122");
	result.push_back("001022");
	result.push_back("320211");
	result.push_back("322120");
	result.push_back("302130");
	result.push_back("211332");
	result.push_back("031022");
	result.push_back("020231");
	result.push_back("222102");
	result.push_back("300212");
	result.push_back("200231");
	result.push_back("202031");
	result.push_back("103212");
	result.push_back("000032");
	result.push_back("130212");
	result.push_back("101331");
	result.push_back("120012");
	result.push_back("322310");
	result.push_back("132012");
	result.push_back("121100");
	result.push_back("033013");
	result.push_back("113320");
	result.push_back("011023");
	result.push_back("112311");
	result.push_back("001321");
	result.push_back("132133");
	result.push_back("010321");
	result.push_back("311031");
	result.push_back("103100");
	result.push_back("102031");
	result.push_back("121132");
	result.push_back("100321");
	result.push_back("030203");
	result.push_back("103001");
	result.push_back("103210");
	result.push_back("302002");
	result.push_back("002212");
	result.push_back("212332");
	result.push_back("222013");
	result.push_back("022120");
	result.push_back("221010");
	result.push_back("302331");
	result.push_back("101032");
	result.push_back("301022");
	result.push_back("200302");
	result.push_back("010301");
	result.push_back("222020");
	result.push_back("222200");
	result.push_back("002331");
	result.push_back("301200");
	result.push_back("131131");
	result.push_back("003012");
	result.push_back("003102");
	result.push_back("003120");
	result.push_back("132330");
	result.push_back("300220");
	result.push_back("022021");
	result.push_back("231303");
	result.push_back("220021");
	result.push_back("010231");
	result.push_back("311320");
	result.push_back("302212");
	result.push_back("220201");
	result.push_back("222130");
	result.push_back("212031");
	result.push_back("003013");
	result.push_back("220032");
	result.push_back("313001");
	result.push_back("300102");
	result.push_back("003130");
	result.push_back("020300");
	result.push_back("001121");
	result.push_back("022100");
	result.push_back("200300");
	result.push_back("203000");
	result.push_back("003202");
	result.push_back("321103");
	result.push_back("200030");
	result.push_back("000201");
	result.push_back("032002");
	result.push_back("231312");
	result.push_back("200013");
	result.push_back("030013");
	result.push_back("012223");
	result.push_back("102223");
	result.push_back("120223");
	result.push_back("201201");
	result.push_back("111123");
	result.push_back("202232");
	result.push_back("300013");
	result.push_back("300130");
	result.push_back("302020");
	result.push_back("031131");
	result.push_back("332310");
	result.push_back("210120");
	result.push_back("211311");
	result.push_back("132202");
	result.push_back("302200");
	result.push_back("031001");
	result.push_back("321201");
	result.push_back("130111");
	result.push_back("130322");
	result.push_back("013000");
	result.push_back("213111");
	result.push_back("230123");
	result.push_back("030033");
	result.push_back("122011");
	result.push_back("133022");
	result.push_back("200213");
	result.push_back("133202");
	result.push_back("332302");
	result.push_back("133220");
	result.push_back("301321");
	result.push_back("221011");
	result.push_back("310321");
	result.push_back("300213");
	result.push_back("232011");
	result.push_back("313021");
	result.push_back("023202");
	result.push_back("313201");
	result.push_back("223130");
	result.push_back("313210");
	result.push_back("202110");
	result.push_back("331101");
	result.push_back("100231");
	result.push_back("301300");
	result.push_back("320023");
	result.push_back("102321");
	result.push_back("122000");
	result.push_back("010302");
	result.push_back("001101");
	result.push_back("323321");
	result.push_back("100302");
	result.push_back("312202");
	result.push_back("103002");
	result.push_back("313000");
	result.push_back("000320");
	result.push_back("302133");
	result.push_back("010222");
	result.push_back("320312");
	result.push_back("012022");
	result.push_back("312300");
	result.push_back("121202");
	result.push_back("101222");
	result.push_back("012220");
	result.push_back("020121");
	result.push_back("201021");
	result.push_back("210032");
	result.push_back("201210");
	result.push_back("030322");
	result.push_back("221131");
	result.push_back("102022");
	result.push_back("120022");
	result.push_back("333013");
	result.push_back("303011");
	result.push_back("120202");
	result.push_back("012211");
	result.push_back("101200");
	result.push_back("120220");
	result.push_back("333121");
	result.push_back("220000");
	result.push_back("312001");
	result.push_back("103131");
	result.push_back("023300");
	result.push_back("302132");
	result.push_back("321032");
	result.push_back("200003");
	result.push_back("130300");
	result.push_back("231111");
	result.push_back("321302");
	result.push_back("231010");
	result.push_back("321320");
	result.push_back("122200");
	result.push_back("320120");
	result.push_back("010110");
	result.push_back("213010");
	result.push_back("021220");
	result.push_back("130303");
	result.push_back("213100");
	result.push_back("222213");
	result.push_back("000113");
	result.push_back("002322");
	result.push_back("302211");
	result.push_back("001130");
	result.push_back("102012");
	result.push_back("210311");
	result.push_back("322331");
	result.push_back("012301");
	result.push_back("321231");
	result.push_back("123001");
	result.push_back("123010");
	result.push_back("123201");
	result.push_back("233312");
	result.push_back("311131");
	result.push_back("231202");
	result.push_back("102110");
	result.push_back("121010");
	result.push_back("022103");
	result.push_back("100111");
	result.push_back("202103");
	result.push_back("113031");
	result.push_back("131130");
	result.push_back("123203");
	result.push_back("311302");
	result.push_back("221003");
	result.push_back("212312");
	result.push_back("201113");
	result.push_back("003113");
	result.push_back("031103");
	result.push_back("220131");
	result.push_back("223202");
	result.push_back("010013");
	result.push_back("110212");
	result.push_back("010103");
	result.push_back("012120");
	result.push_back("010130");
	result.push_back("002201");
	result.push_back("022001");
	result.push_back("232100");
	result.push_back("032121");
	result.push_back("013310");
	result.push_back("302121");
	result.push_back("003333");
	result.push_back("320121");
	result.push_back("220320");
	result.push_back("321021");
	result.push_back("013203");
	result.push_back("130203");
	result.push_back("132030");
	result.push_back("202002");
	result.push_back("003212");
	result.push_back("202221");
	result.push_back("201003");
	result.push_back("030212");
	result.push_back("101311");
	result.push_back("032120");
	result.push_back("011003");
	result.push_back("202100");
	result.push_back("212200");
	result.push_back("202223");
	result.push_back("011030");
	result.push_back("230000");
	result.push_back("220031");
	result.push_back("300332");
	result.push_back("003021");
	result.push_back("030021");
	result.push_back("100130");
	result.push_back("203211");
	result.push_back("002122");
	result.push_back("331313");
	result.push_back("020122");
	result.push_back("112310");
	result.push_back("310120");
	result.push_back("021022");
	result.push_back("022110");
	result.push_back("331133");
	result.push_back("110030");
	result.push_back("310002");
	result.push_back("320000");
	result.push_back("020220");
	result.push_back("130301");
	result.push_back("002022");
	result.push_back("212131");
	result.push_back("221221");
	result.push_back("010202");
	result.push_back("102002");
	result.push_back("313313");
	result.push_back("010031");
	result.push_back("023101");
	result.push_back("122033");
	result.push_back("230101");
	result.push_back("113012");
	result.push_back("231001");
	result.push_back("133320");
	result.push_back("030223");
	result.push_back("212032");
	result.push_back("000123");
	result.push_back("032023");
	result.push_back("032203");
	result.push_back("331322");
	result.push_back("131222");
	result.push_back("032230");
	result.push_back("100013");
	result.push_back("230031");
	result.push_back("101003");
	result.push_back("121323");
	result.push_back("301000");
	result.push_back("021012");
	result.push_back("310000");
	result.push_back("031211");
	result.push_back("202010");
	result.push_back("212222");
	result.push_back("310211");
	result.push_back("312011");
	result.push_back("312101");
	result.push_back("300033");
	result.push_back("000131");
	result.push_back("022320");
	result.push_back("102201");
	result.push_back("031200");
	result.push_back("310011");
	result.push_back("310200");
	result.push_back("233022");
	result.push_back("022231");
	result.push_back("312000");
	result.push_back("012010");
	result.push_back("013101");
	result.push_back("320020");
	result.push_back("101323");
	result.push_back("320200");
	result.push_back("000330");
	result.push_back("022301");
	result.push_back("100123");
	result.push_back("101023");
	result.push_back("101230");
	result.push_back("213322");
	result.push_back("002231");
	result.push_back("011222");
	result.push_back("012003");
	result.push_back("321013");
	result.push_back("102003");
	result.push_back("120003");
	result.push_back("200000");
	result.push_back("222302");
	result.push_back("320122");
	result.push_back("101313");
	result.push_back("120030");
	result.push_back("201022");
	result.push_back("210220");
	result.push_back("321000");
	result.push_back("013110");
	result.push_back("130110");
	result.push_back("131010");
	result.push_back("131311");
	result.push_back("131100");
	result.push_back("202300");
	result.push_back("130002");
	result.push_back("110230");
	result.push_back("112300");
	result.push_back("132333");
	result.push_back("322022");
	result.push_back("122330");
	result.push_back("100003");
	result.push_back("132231");
	result.push_back("123200");
	result.push_back("123011");
	result.push_back("223001");
	result.push_back("311301");
	result.push_back("030213");
	result.push_back("103013");
	result.push_back("302103");
	result.push_back("123021");
	result.push_back("123210");
	result.push_back("020133");
	result.push_back("133000");
	result.push_back("310020");
	result.push_back("112102");
	result.push_back("321022");
	result.push_back("212232");
	result.push_back("021123");
	result.push_back("210323");
	result.push_back("201123");
	result.push_back("230131");
	result.push_back("211023");
	result.push_back("232120");
	result.push_back("211230");
	result.push_back("122132");
	result.push_back("002213");
	result.push_back("020213");
	result.push_back("022130");
	result.push_back("202130");
	result.push_back("323101");
	result.push_back("020030");
	result.push_back("313310");
	result.push_back("120211");
	result.push_back("221200");
	result.push_back("222122");
	result.push_back("122101");
	result.push_back("131300");
	result.push_back("220013");
	result.push_back("220130");
	result.push_back("001302");
	result.push_back("112203");
	result.push_back("013002");
	result.push_back("310331");
	result.push_back("012102");
	result.push_back("012313");
	result.push_back("301210");
	result.push_back("102102");
	result.push_back("221233");
	result.push_back("121002");
	result.push_back("201221");
	result.push_back("233201");
	result.push_back("000122");
	result.push_back("031222");
	result.push_back("001220");
	result.push_back("101013");
	result.push_back("300312");
	result.push_back("310303");
	result.push_back("210331");
	result.push_back("303131");
	result.push_back("313003");
	result.push_back("212111");
	result.push_back("313030");
	result.push_back("011110");
	result.push_back("101110");
	result.push_back("330211");
	result.push_back("110110");
	result.push_back("113023");
	result.push_back("113203");
	result.push_back("112320");
	result.push_back("022032");
	result.push_back("303332");
	result.push_back("023113");
	result.push_back("111303");
	result.push_back("113230");
	result.push_back("201012");
	result.push_back("301232");
	result.push_back("312330");
	result.push_back("310232");
	result.push_back("312032");
	result.push_back("312302");
	result.push_back("012201");
	result.push_back("122001");
	result.push_back("001203");
	result.push_back("202233");
	result.push_back("201322");
	result.push_back("103133");
	result.push_back("232201");
	result.push_back("010012");
	result.push_back("100012");
	result.push_back("300100");
	result.push_back("100120");
	result.push_back("213222");
	result.push_back("230333");
	result.push_back("212333");
	result.push_back("310102");
	result.push_back("233303");
	result.push_back("232112");
	result.push_back("131321");
	result.push_back("312033");
	result.push_back("233330");
	result.push_back("232332");
	result.push_back("300223");
	result.push_back("200222");
	result.push_back("302023");
	result.push_back("302203");
	result.push_back("203313");
	result.push_back("302230");
	result.push_back("110311");
	result.push_back("120300");
	result.push_back("110122");
	result.push_back("102300");
	result.push_back("233202");
	result.push_back("002100");
	result.push_back("021013");
	result.push_back("010101");
	result.push_back("323332");
	result.push_back("122310");
	result.push_back("030031");
	result.push_back("030310");
	result.push_back("210000");
	result.push_back("021333");
	result.push_back("002311");
	result.push_back("202231");
	result.push_back("023110");
	result.push_back("121201");
	result.push_back("100232");
	result.push_back("021000");
	result.push_back("113013");
	result.push_back("100212");
	result.push_back("012001");
	result.push_back("120010");
	result.push_back("100001");
	result.push_back("302320");
	result.push_back("133222");
	result.push_back("302001");
	result.push_back("322330");
	result.push_back("021130");
	result.push_back("302011");
	result.push_back("312313");
	result.push_back("213330");
	result.push_back("320110");
	result.push_back("323323");
	result.push_back("023200");
	result.push_back("030111");
	result.push_back("113222");
	result.push_back("313223");
	result.push_back("230020");
	result.push_back("131011");
	result.push_back("110131");
	result.push_back("230200");
	result.push_back("131200");
	result.push_back("220002");
	result.push_back("303132");
	result.push_back("220020");
	result.push_back("032200");
	result.push_back("022300");
	result.push_back("102100");
	result.push_back("031112");
	result.push_back("132230");
	result.push_back("311102");
	result.push_back("130213");
	result.push_back("020322");
	result.push_back("023022");
	result.push_back("023220");
	result.push_back("333122");
	result.push_back("021110");
	result.push_back("302003");
	result.push_back("232000");
	result.push_back("322312");
	result.push_back("002031");
	result.push_back("020031");
	result.push_back("200031");
	result.push_back("203100");
	result.push_back("200021");
	result.push_back("031332");
	result.push_back("001011");
	result.push_back("300132");
	result.push_back("322222");
	result.push_back("301302");
	result.push_back("213113");
	result.push_back("312321");
	result.push_back("301320");
	result.push_back("200321");
	result.push_back("302302");
	result.push_back("111320");
	result.push_back("000222");
	result.push_back("210112");
	result.push_back("101001");
	result.push_back("202123");
	result.push_back("210321");
	result.push_back("011011");
	result.push_back("101011");
	result.push_back("110011");
	result.push_back("220330");
	result.push_back("011200");
	result.push_back("112000");
	result.push_back("132332");
	result.push_back("021201");
	result.push_back("102313");
	result.push_back("121000");
	result.push_back("010313");
	result.push_back("220023");
	result.push_back("311212");
	result.push_back("033230");
	result.push_back("120313");
	result.push_back("123103");
	result.push_back("001221");
	result.push_back("323122");
	result.push_back("232010");
	result.push_back("010221");
	result.push_back("332223");
	result.push_back("130233");
	result.push_back("012021");
	result.push_back("321002");
	result.push_back("231130");
	result.push_back("012012");
	result.push_back("200122");
	result.push_back("133233");
	result.push_back("201220");
	result.push_back("031313");
	result.push_back("203131");
	result.push_back("310313");
	result.push_back("003222");
	result.push_back("100221");
	result.push_back("120021");
	result.push_back("133231");
	result.push_back("300311");
	result.push_back("222332");
	result.push_back("303101");
	result.push_back("023213");
	result.push_back("320102");
	result.push_back("100021");
	result.push_back("301100");
	result.push_back("231233");
	result.push_back("320223");
	result.push_back("022123");
	result.push_back("310100");
	result.push_back("031012");
	result.push_back("100121");
	result.push_back("211302");
	result.push_back("202230");
	result.push_back("333203");
	result.push_back("112200");
	result.push_back("222300");
	result.push_back("212101");
	result.push_back("202023");
	result.push_back("001111");
	result.push_back("010111");
	result.push_back("330332");
	result.push_back("033212");
	result.push_back("222120");
	result.push_back("303212");
	result.push_back("332120");
	result.push_back("232320");
	result.push_back("033130");
	result.push_back("022221");
	result.push_back("010112");
	result.push_back("220221");
	result.push_back("222021");
	result.push_back("333302");
	result.push_back("222201");
	result.push_back("222210");
	result.push_back("100211");
	result.push_back("023311");
	result.push_back("222301");
	result.push_back("230311");
	result.push_back("233011");
	result.push_back("202132");
	result.push_back("233110");
	result.push_back("310302");
	result.push_back("201321");
	result.push_back("310320");
	result.push_back("030123");
	result.push_back("003121");
	result.push_back("030121");
	result.push_back("031210");
	result.push_back("313020");
	result.push_back("232133");
	result.push_back("330132");
	result.push_back("313200");
	result.push_back("212211");
	result.push_back("311011");
	result.push_back("032222");
	result.push_back("021322");
	result.push_back("302222");
	result.push_back("320222");
	result.push_back("322202");
	result.push_back("020223");
	result.push_back("322220");
	result.push_back("223022");
	result.push_back("100131");
	result.push_back("223220");
	result.push_back("002321");
	result.push_back("122201");
	result.push_back("213213");
	result.push_back("302231");
	result.push_back("021331");
	result.push_back("223333");
	result.push_back("201331");
	result.push_back("213031");
	result.push_back("213301");
	result.push_back("213310");
	result.push_back("331200");
	result.push_back("133003");
	result.push_back("202020");
	result.push_back("230122");
	result.push_back("210133");
	result.push_back("031020");
	result.push_back("211330");
	result.push_back("213302");
	result.push_back("110001");
	result.push_back("322332");
	result.push_back("120100");
	result.push_back("020000");
	result.push_back("020211");
	result.push_back("313133");
	result.push_back("002211");
	result.push_back("023321");
	result.push_back("203321");
	result.push_back("110013");
	result.push_back("330011");
	result.push_back("211100");
	result.push_back("233021");
	result.push_back("211232");
	result.push_back("120013");
	result.push_back("302312");
	result.push_back("202003");
	result.push_back("111002");
	result.push_back("120130");
	result.push_back("320131");
	result.push_back("303001");
	result.push_back("130321");
	result.push_back("332103");
	result.push_back("332130");
	result.push_back("322230");
	result.push_back("031312");
	result.push_back("301312");
	result.push_back("310312");
	result.push_back("313120");
	result.push_back("030110");
	result.push_back("300110");
	result.push_back("103323");
	result.push_back("003200");
	result.push_back("133023");
	result.push_back("133203");
	result.push_back("102232");
	result.push_back("133230");
	result.push_back("103112");
	result.push_back("103303");
	result.push_back("111120");
	result.push_back("311100");
	result.push_back("100223");
	result.push_back("010023");
	result.push_back("223113");
	result.push_back("220112");
	result.push_back("102023");
	result.push_back("011032");
	result.push_back("110202");
	result.push_back("311310");
	result.push_back("102122");
	result.push_back("220233");
	result.push_back("222033");
	result.push_back("222330");
	result.push_back("200103");
	result.push_back("033202");
	result.push_back("110022");
	result.push_back("332002");
	result.push_back("121033");
	result.push_back("002232");
	result.push_back("030313");
	result.push_back("210003");
	result.push_back("012020");
	result.push_back("113232");
	result.push_back("122102");
	result.push_back("033220");
	result.push_back("330220");
	result.push_back("120020");
	result.push_back("030012");
	result.push_back("300202");
	result.push_back("112021");
	result.push_back("203002");
	result.push_back("000111");
	result.push_back("332313");
	result.push_back("220100");
	result.push_back("200133");
	result.push_back("201303");
	result.push_back("323200");
	result.push_back("032000");
	result.push_back("121312");
	result.push_back("301031");
	result.push_back("021023");
	result.push_back("322313");
	result.push_back("112221");
	result.push_back("300211");
	result.push_back("302110");
	result.push_back("131313");
	result.push_back("300000");
	result.push_back("003210");
	result.push_back("020331");
	result.push_back("323020");
	result.push_back("023031");
	result.push_back("003033");
	result.push_back("103132");
	result.push_back("023310");
	result.push_back("022131");
	result.push_back("200331");
	result.push_back("203310");
	result.push_back("002121");
	result.push_back("230310");
	result.push_back("020303");
	result.push_back("032331");
	result.push_back("200303");
	result.push_back("002112");
	result.push_back("133322");
	result.push_back("002001");
	result.push_back("020001");
	result.push_back("120111");
	result.push_back("321030");
	result.push_back("101031");
	result.push_back("110031");
	result.push_back("331020");
	result.push_back("030222");
	result.push_back("013333");
	result.push_back("131333");
	result.push_back("103333");
	result.push_back("131102");
	result.push_back("130333");
	result.push_back("313111");
	result.push_back("130101");
	result.push_back("133033");
	result.push_back("223013");
	result.push_back("133330");
	result.push_back("330101");
	result.push_back("331001");
	result.push_back("121030");
	result.push_back("200023");
	result.push_back("200230");
	result.push_back("310110");
	result.push_back("010131");
	result.push_back("033232");
	result.push_back("021132");
	result.push_back("111212");
	result.push_back("210132");
	result.push_back("333312");
	result.push_back("211032");
	result.push_back("021311");
	result.push_back("223312");
	result.push_back("120122");
	result.push_back("022210");
	result.push_back("223211");
	result.push_back("222100");
	result.push_back("220003");
	result.push_back("021230");
	result.push_back("201230");
	result.push_back("111301");
	result.push_back("210230");
	result.push_back("010322");
	result.push_back("321012");
	result.push_back("203332");
	result.push_back("233032");
	result.push_back("233302");
	result.push_back("110130");
	result.push_back("221311");
	result.push_back("020210");
	result.push_back("023320");
	result.push_back("330122");
	result.push_back("233020");
	result.push_back("233200");
	result.push_back("223132");
	result.push_back("103202");
	result.push_back("121001");
	result.push_back("021323");
	result.push_back("330313");
	result.push_back("201323");
	result.push_back("213023");
	result.push_back("303032");
	result.push_back("330032");
	result.push_back("130023");
	result.push_back("310330");
	result.push_back("222112");
	result.push_back("200001");
	result.push_back("000013");
	result.push_back("033303");
	result.push_back("303303");
	result.push_back("033022");
	result.push_back("122032");
	result.push_back("110002");
	result.push_back("330022");
	result.push_back("223222");
	result.push_back("001300");
	result.push_back("300221");
	result.push_back("302021");
	result.push_back("302201");
	result.push_back("230201");
	result.push_back("133221");
	result.push_back("232001");
	result.push_back("013211");
	result.push_back("132101");
	result.push_back("032021");
	result.push_back("300021");
	result.push_back("231031");
	result.push_back("032113");
	result.push_back("130013");
	result.push_back("320113");
	result.push_back("321130");
	result.push_back("230223");
	result.push_back("301202");
	result.push_back("312002");
	result.push_back("232312");
	result.push_back("321332");
	result.push_back("001012");
	result.push_back("013330");
	result.push_back("211233");
	result.push_back("102222");
	result.push_back("130330");
	result.push_back("133111");
	result.push_back("133300");
	result.push_back("221002");
	result.push_back("201332");
	result.push_back("332212");
	result.push_back("210332");
	result.push_back("100023");
	result.push_back("133232");
	result.push_back("231203");
	result.push_back("102111");
	result.push_back("121011");
	result.push_back("320230");
	result.push_back("033113");
	result.push_back("100313");
	result.push_back("103130");
	result.push_back("233232");
	result.push_back("210122");
	result.push_back("000322");
	result.push_back("330323");
	result.push_back("133201");
	result.push_back("300201");
	result.push_back("203023");
	result.push_back("032130");
	result.push_back("230023");
	result.push_back("230203");
	result.push_back("322323");
	result.push_back("133312");
	result.push_back("220001");
	result.push_back("023233");
	result.push_back("303122");
	result.push_back("210303");
	result.push_back("001210");
	result.push_back("013133");
	result.push_back("001023");
	result.push_back("311013");
	result.push_back("130133");
	result.push_back("223031");
	result.push_back("131033");
	result.push_back("131330");
	result.push_back("331130");
	result.push_back("213011");
	result.push_back("301323");
	result.push_back("213110");
	result.push_back("300121");
	result.push_back("003221");
	result.push_back("131213");
	result.push_back("210233");
	result.push_back("032201");
	result.push_back("131020");
	result.push_back("032210");
	result.push_back("112123");
	result.push_back("230222");
	result.push_back("230011");
	result.push_back("230110");
	result.push_back("033120");
	result.push_back("223003");
	result.push_back("301011");
	result.push_back("301101");
	result.push_back("232232");
	result.push_back("121123");
	result.push_back("301110");
	result.push_back("301301");
	result.push_back("010032");
	result.push_back("101103");
	result.push_back("101130");
	result.push_back("223111");
	result.push_back("021102");
	result.push_back("021120");
	result.push_back("020321");
	result.push_back("023021");
	result.push_back("023210");
	result.push_back("101202");
	result.push_back("112002");
	result.push_back("203323");
	result.push_back("110103");
	result.push_back("122222");
	result.push_back("203021");
	result.push_back("203210");
	result.push_back("211022");
	result.push_back("203212");
	result.push_back("322102");
	result.push_back("230212");
	result.push_back("110211");
	result.push_back("232102");
	result.push_back("032003");
	result.push_back("013230");
	result.push_back("122303");
	result.push_back("132300");
	result.push_back("332220");
	result.push_back("003232");
	result.push_back("122321");
	result.push_back("032032");
	result.push_back("300232");
	result.push_back("032320");
	result.push_back("331311");
	result.push_back("001331");
	result.push_back("302032");
	result.push_back("320032");
	result.push_back("002303");
	result.push_back("200112");
	result.push_back("320302");
	result.push_back("130332");
	result.push_back("002123");
	result.push_back("202001");
	result.push_back("020123");
	result.push_back("233103");
	result.push_back("323002");
	result.push_back("230233");
	result.push_back("301322");
	result.push_back("313022");
	result.push_back("112201");
	result.push_back("011122");
	result.push_back("201232");
	result.push_back("313220");
	result.push_back("012032");
	result.push_back("033102");
	result.push_back("303102");
	result.push_back("331213");
	result.push_back("331002");
	result.push_back("131002");
	result.push_back("022201");
	result.push_back("111022");
	result.push_back("210110");
	result.push_back("013303");
	result.push_back("031330");
	result.push_back("301330");
	result.push_back("313300");
	result.push_back("301310");
	result.push_back("122213");
	result.push_back("032311");
	result.push_back("320311");
	result.push_back("323110");
	result.push_back("123333");
	result.push_back("100331");
	result.push_back("121212");
	result.push_back("103301");
	result.push_back("211210");
	result.push_back("200201");
	result.push_back("011301");
	result.push_back("112133");
	result.push_back("231113");
	result.push_back("213312");
	result.push_back("023003");
	result.push_back("000133");
	result.push_back("120233");
	result.push_back("023331");
	result.push_back("332201");
	result.push_back("233031");
	result.push_back("233310");
	result.push_back("102323");
	result.push_back("123023");
	result.push_back("133100");
	result.push_back("033233");
	result.push_back("202313");
	result.push_back("013232");
	result.push_back("223103");
	result.push_back("102221");
	result.push_back("120221");
	result.push_back("301201");
	result.push_back("330310");
	result.push_back("301033");
	result.push_back("033332");
	result.push_back("333032");
	result.push_back("202202");
	result.push_back("320323");
	result.push_back("030120");
	result.push_back("031213");
	result.push_back("003313");
	result.push_back("300222");
	result.push_back("112302");
	result.push_back("302022");
	result.push_back("230111");
	result.push_back("101220");
	result.push_back("302202");
	result.push_back("123121");
	result.push_back("302220");
	result.push_back("033310");
	result.push_back("033123");
	result.push_back("111223");
	result.push_back("121131");
	result.push_back("331023");
	result.push_back("331203");
	result.push_back("333112");
	result.push_back("111110");
	result.push_back("003131");
	result.push_back("113001");
	result.push_back("301020");
	result.push_back("301230");
	result.push_back("310230");
	result.push_back("000121");
	result.push_back("001021");
	result.push_back("110312");
	result.push_back("310101");
	result.push_back("121311");
	result.push_back("123311");
	result.push_back("311001");
	result.push_back("311010");
	result.push_back("310213");
	result.push_back("033222");
	result.push_back("331222");
	result.push_back("330222");
	result.push_back("300323");
	result.push_back("332022");
	result.push_back("332202");
	result.push_back("130001");
	result.push_back("100031");
	result.push_back("322030");
	result.push_back("101121");
	result.push_back("110121");
	result.push_back("111021");
	result.push_back("111201");
	result.push_back("111210");
	result.push_back("220033");
	result.push_back("303103");
	result.push_back("331212");
	result.push_back("331003");
	result.push_back("231123");
	result.push_back("331030");
	result.push_back("311003");
	result.push_back("222002");
	result.push_back("112022");
	result.push_back("200123");
	result.push_back("001223");
	result.push_back("012023");
	result.push_back("012230");
	result.push_back("231000");
	result.push_back("111131");
	result.push_back("221023");
	result.push_back("003110");
	result.push_back("231321");
	result.push_back("003310");
	result.push_back("130123");
	result.push_back("012133");
	result.push_back("303221");
	result.push_back("301221");
	result.push_back("312021");
	result.push_back("211300");
	result.push_back("031010");
	result.push_back("332032");
	result.push_back("033223");
	result.push_back("313320");
	result.push_back("120023");
	result.push_back("303223");
	result.push_back("332203");
	result.push_back("332230");
	result.push_back("032322");
	result.push_back("333100");
	result.push_back("302322");
	result.push_back("133031");
	result.push_back("312301");
	result.push_back("320322");
	result.push_back("103033");
	result.push_back("323022");
	result.push_back("323202");
	result.push_back("321003");
	result.push_back("000231");
	result.push_back("132221");
	result.push_back("203300");
	result.push_back("011211");
	result.push_back("333131");
	result.push_back("112011");
	result.push_back("112101");
	result.push_back("112110");
	result.push_back("113233");
	result.push_back("013311");
	result.push_back("322133");
	result.push_back("130311");
	result.push_back("133011");
	result.push_back("133101");
	result.push_back("133110");
	result.push_back("000132");
	result.push_back("100032");
	result.push_back("300022");
	result.push_back("000321");
	result.push_back("223121");
	result.push_back("021213");
	result.push_back("201213");
	result.push_back("212013");
	result.push_back("212103");
	result.push_back("310222");
	result.push_back("212130");
	result.push_back("000331");
	result.push_back("132113");
	result.push_back("023222");
	result.push_back("203222");
	result.push_back("320133");
	result.push_back("101133");
	result.push_back("232022");
	result.push_back("222133");
	result.push_back("312121");
	result.push_back("200312");
	result.push_back("232202");
	result.push_back("232220");
	result.push_back("212012");
	result.push_back("213030");
	result.push_back("123300");
	result.push_back("133311");
	result.push_back("200032");
	result.push_back("221301");
	result.push_back("022232");
	result.push_back("220232");
	result.push_back("222032");
	result.push_back("222320");
	result.push_back("201130");
	result.push_back("011133");
	result.push_back("110133");
	result.push_back("111033");
	result.push_back("213102");
	result.push_back("003123");
	result.push_back("031203");
	result.push_back("111013");
	result.push_back("300123");
	result.push_back("301203");
	result.push_back("333311");
	result.push_back("102312");
	result.push_back("310203");
	result.push_back("033322");
	result.push_back("303113");
	result.push_back("221212");
	result.push_back("330113");
	result.push_back("331103");
	result.push_back("021222");
	result.push_back("201211");
	result.push_back("203102");
	result.push_back("230102");
	result.push_back("231002");
	result.push_back("231020");
	result.push_back("110023");
	result.push_back("110203");
	result.push_back("010232");
	result.push_back("102032");
	result.push_back("000233");
	result.push_back("002033");
	result.push_back("020033");
	result.push_back("020330");
	result.push_back("201233");
	result.push_back("311233");
	result.push_back("212033");
	result.push_back("212303");
	result.push_back("212330");
	result.push_back("031311");
	result.push_back("301311");
	result.push_back("310311");
	result.push_back("203123");
	result.push_back("313011");
	result.push_back("313110");
	result.push_back("120230");
	result.push_back("122300");
	result.push_back("011333");
	result.push_back("311032");
	result.push_back("101333");
	result.push_back("113033");
	result.push_back("113303");
	result.push_back("113330");
	result.push_back("230113");
	result.push_back("231013");
	result.push_back("231103");
	result.push_back("032022");
	result.push_back("211113");
	result.push_back("032202");
	result.push_back("333220");
	result.push_back("131001");
	result.push_back("032220");
	result.push_back("113212");
	result.push_back("321100");
	result.push_back("320022");
	result.push_back("322213");
	result.push_back("322002");
	result.push_back("233332");
	result.push_back("322020");
	result.push_back("200033");
	result.push_back("200330");
	result.push_back("302323");
	result.push_back("323023");
	result.push_back("323203");
	result.push_back("323230");
	result.push_back("223122");
	result.push_back("201120");
	result.push_back("211002");
	result.push_back("211020");
	result.push_back("230003");
	result.push_back("111230");
	result.push_back("210033");
	result.push_back("030323");
	result.push_back("012232");
	result.push_back("033203");
	result.push_back("303230");
	result.push_back("332003");
	result.push_back("332030");
	result.push_back("332300");
	result.push_back("300023");
	result.push_back("300203");
	result.push_back("321303");
	result.push_back("233000");
	result.push_back("300122");
	result.push_back("113101");
	result.push_back("320003");
	result.push_back("121121");
	result.push_back("003032");
	result.push_back("221312");
	result.push_back("003320");
	result.push_back("030032");
	result.push_back("033200");
	result.push_back("032232");
	result.push_back("300032");
	result.push_back("332000");
	result.push_back("000333");
	result.push_back("232103");
	result.push_back("203203");
	result.push_back("222111");
	result.push_back("203230");
	result.push_back("232003");
	result.push_back("232300");
	result.push_back("102101");
	result.push_back("323313");
	result.push_back("010212");
	result.push_back("102120");
	result.push_back("032333");
	result.push_back("302333");
	result.push_back("320333");
	result.push_back("323330");
	result.push_back("121200");
	result.push_back("301213");
	result.push_back("230012");
	result.push_back("230120");
	result.push_back("321331");
	result.push_back("021021");
	result.push_back("021210");
	result.push_back("030331");
	result.push_back("210021");
	result.push_back("212001");
	result.push_back("011312");
	result.push_back("101312");
	result.push_back("113102");
	result.push_back("332323");
	result.push_back("113120");
	result.push_back("111003");
	result.push_back("111030");
	result.push_back("001311");
	result.push_back("212100");
	result.push_back("031301");
	result.push_back("313010");
	result.push_back("102231");
	result.push_back("120231");
	result.push_back("122031");
	result.push_back("122301");
	result.push_back("222123");
	result.push_back("203220");
	result.push_back("232020");
	result.push_back("111300");
	result.push_back("002221");
	result.push_back("020221");
	result.push_back("002332");
	result.push_back("020332");
	result.push_back("023302");
	result.push_back("222001");
	result.push_back("213001");
	result.push_back("321221");
	result.push_back("303233");
	result.push_back("330233");
	result.push_back("332303");
	result.push_back("332330");
	result.push_back("232322");
	result.push_back("312311");
	result.push_back("303310");
	result.push_back("001112");
	result.push_back("120312");
	result.push_back("011102");
	result.push_back("011120");
	result.push_back("200332");
	result.push_back("203302");
	result.push_back("100112");
	result.push_back("231110");
	result.push_back("101012");
	result.push_back("101102");
	result.push_back("101120");
	result.push_back("232033");
	result.push_back("110012");
	result.push_back("321200");
	result.push_back("110102");
	result.push_back("111020");
	result.push_back("111200");
	result.push_back("010121");
	result.push_back("313112");
	result.push_back("011210");
	result.push_back("101210");
	result.push_back("210232");
	result.push_back("033323");
	result.push_back("112100");
	result.push_back("022112");
	result.push_back("202112");
	result.push_back("221120");
	result.push_back("003112");
	result.push_back("213332");
	result.push_back("031120");
	result.push_back("322010");
	result.push_back("322100");
	result.push_back("202032");
	result.push_back("232203");
	result.push_back("220302");
	result.push_back("013011");
	result.push_back("130011");
	result.push_back("212113");
	result.push_back("003312");
	result.push_back("100122");
	result.push_back("320112");
	result.push_back("110220");
	result.push_back("103113");
	result.push_back("131013");
	result.push_back("131103");
	result.push_back("121211");
	result.push_back("012233");
	result.push_back("013301");
	result.push_back("021211");
	result.push_back("212110");
	result.push_back("001333");
	result.push_back("332213");
	result.push_back("010333");
	result.push_back("013033");
	result.push_back("133001");
	result.push_back("133010");
	result.push_back("333321");
	result.push_back("022333");
	result.push_back("200232");
	result.push_back("202333");
	result.push_back("311211");
	result.push_back("123101");
	result.push_back("220333");
	result.push_back("303313");
	result.push_back("333103");
	result.push_back("333130");
	result.push_back("233111");
	result.push_back("123220");
	result.push_back("132013");
	result.push_back("132130");
	result.push_back("120032");
	result.push_back("201302");
	result.push_back("201320");
	result.push_back("210302");
	result.push_back("210320");
	result.push_back("200223");
	result.push_back("213200");
	result.push_back("031123");
	result.push_back("133310");
	result.push_back("001322");
	result.push_back("333233");
	result.push_back("131203");
	result.push_back("013202");
	result.push_back("013220");
	result.push_back("132002");
	result.push_back("202131");
	result.push_back("221031");
	result.push_back("300331");
	result.push_back("022331");
	result.push_back("303031");
	result.push_back("132200");
	result.push_back("302012");
	result.push_back("033131");
	result.push_back("302120");
	result.push_back("311332");
	result.push_back("202212");
	result.push_back("222012");
	result.push_back("031113");
	result.push_back("322011");
	result.push_back("301113");
	result.push_back("102121");
	result.push_back("310113");
	result.push_back("311130");
	result.push_back("320012");
	result.push_back("231112");
	result.push_back("321020");
	result.push_back("203122");
	result.push_back("231022");
	result.push_back("021033");
	result.push_back("021303");
	result.push_back("333210");
	result.push_back("120232");
	result.push_back("122302");
	result.push_back("122320");
	result.push_back("032212");
	result.push_back("320212");
	result.push_back("322221");
	result.push_back("322012");
	result.push_back("213003");
	result.push_back("213300");
	result.push_back("310123");
	result.push_back("001323");
	result.push_back("013023");
	result.push_back("003213");
	result.push_back("321300");
	result.push_back("100333");
	result.push_back("011313");
	result.push_back("321132");
	result.push_back("110313");
	result.push_back("113103");
	result.push_back("113130");
	result.push_back("130033");
	result.push_back("312103");
	result.push_back("312130");
	result.push_back("003133");
	result.push_back("030133");
	result.push_back("211323");
	result.push_back("031033");
	result.push_back("033122");
	result.push_back("300133");
	result.push_back("310033");
	result.push_back("311122");
	result.push_back("300313");
	result.push_back("301231");
	result.push_back("132213");
	result.push_back("310231");
	result.push_back("312031");
	result.push_back("312310");
	result.push_back("323012");
	result.push_back("003331");
	result.push_back("031233");
	result.push_back("310233");
	result.push_back("002223");
	result.push_back("202113");
	result.push_back("220113");
	result.push_back("330231");
	result.push_back("221013");
	result.push_back("221103");
	result.push_back("221130");
	result.push_back("112103");
	result.push_back("223002");
	result.push_back("201112");
	result.push_back("223020");
	result.push_back("221223");
	result.push_back("223200");
	result.push_back("330221");
	result.push_back("332021");
	result.push_back("233313");
	result.push_back("023313");
	result.push_back("333301");
	result.push_back("230313");
	result.push_back("233130");
	result.push_back("200322");
	result.push_back("203022");
	result.push_back("013122");
	result.push_back("212202");
	result.push_back("130122");
	result.push_back("232211");
	result.push_back("131202");
	result.push_back("230022");
	result.push_back("200233");
	result.push_back("202033");
	result.push_back("202303");
	result.push_back("202330");
	result.push_back("303323");
	result.push_back("333023");
	result.push_back("223030");
	result.push_back("223300");
	result.push_back("312220");
	result.push_back("320203");
	result.push_back("023131");
	result.push_back("231301");
	result.push_back("231310");
	result.push_back("121222");
	result.push_back("322300");
	result.push_back("003322");
	result.push_back("130222");
	result.push_back("230221");
	result.push_back("132022");
	result.push_back("132220");
	result.push_back("320232");
	result.push_back("322032");
	result.push_back("131221");
	result.push_back("322320");
	result.push_back("003332");
	result.push_back("223123");
	result.push_back("013331");
	result.push_back("300333");
	result.push_back("303121");
	result.push_back("330121");
	result.push_back("221320");
	result.push_back("331201");
	result.push_back("331210");
	result.push_back("033211");
	result.push_back("011331");
	result.push_back("303211");
	result.push_back("332011");
	result.push_back("332101");
	result.push_back("210333");
	result.push_back("213303");
	result.push_back("203133");
	result.push_back("231033");
	result.push_back("231330");
	result.push_back("033311");
	result.push_back("303311");
	result.push_back("330311");
	result.push_back("222233");
	result.push_back("122122");
	result.push_back("333110");
	result.push_back("110331");
	result.push_back("033331");
	result.push_back("113301");
	result.push_back("213021");
	result.push_back("113310");
	result.push_back("011332");
	result.push_back("101332");
	result.push_back("113302");
	result.push_back("130132");
	result.push_back("013312");
	result.push_back("103312");
	result.push_back("133102");
	result.push_back("021313");
	result.push_back("213013");
	result.push_back("201313");
	result.push_back("313031");
	result.push_back("210313");
	result.push_back("331132");
	result.push_back("213130");
	result.push_back("302131");
	result.push_back("321031");
	result.push_back("321301");
	result.push_back("232233");
	result.push_back("011112");
	result.push_back("101112");
	result.push_back("111012");
	result.push_back("101321");
	result.push_back("110321");
	result.push_back("113201");
	result.push_back("113210");
	result.push_back("112202");
	result.push_back("321123");
	result.push_back("012212");
	result.push_back("102212");
	result.push_back("120212");
	result.push_back("312223");
	result.push_back("321322");
	result.push_back("122120");
	result.push_back("012213");
	result.push_back("102213");
	result.push_back("120213");
	result.push_back("122013");
	result.push_back("011221");
	result.push_back("101221");
	result.push_back("112210");
	result.push_back("032332");
	result.push_back("302332");
	result.push_back("320332");
	result.push_back("323032");
	result.push_back("323302");
	result.push_back("323320");
	result.push_back("113223");
	result.push_back("012121");
	result.push_back("120121");
	result.push_back("121021");
	result.push_back("132303");
	result.push_back("301132");
	result.push_back("310132");
	result.push_back("022111");
	result.push_back("032233");
	result.push_back("011232");
	result.push_back("202111");
	result.push_back("220111");
	result.push_back("213233");
	result.push_back("221101");
	result.push_back("332331");
	result.push_back("032133");
	result.push_back("012331");
	result.push_back("102331");
	result.push_back("123031");
	result.push_back("123301");
	result.push_back("123310");
	result.push_back("330111");
	result.push_back("331011");
	result.push_back("233212");
	result.push_back("032123");
	result.push_back("233203");
	result.push_back("302123");
	result.push_back("320123");
	result.push_back("321023");
	result.push_back("321230");
	result.push_back("011213");
	result.push_back("101213");
	result.push_back("012131");
	result.push_back("112222");
	result.push_back("120131");
	result.push_back("113221");
	result.push_back("121031");
	result.push_back("121310");
	result.push_back("213122");
	result.push_back("201222");
	result.push_back("021321");
	result.push_back("213210");
	result.push_back("122323");
	result.push_back("230211");
	result.push_back("232101");
	result.push_back("130232");
	result.push_back("312233");
	result.push_back("132032");
	result.push_back("132320");
	result.push_back("032312");
	result.push_back("323102");
	result.push_back("332321");
	result.push_back("323120");
	result.push_back("213211");
	result.push_back("302321");
	result.push_back("320321");
	result.push_back("323021");
	result.push_back("323201");
	result.push_back("203232");
	result.push_back("230232");
	result.push_back("232032");
	result.push_back("232302");
	result.push_back("121320");
	result.push_back("012311");
	result.push_back("102311");
	result.push_back("123110");
	result.push_back("231011");
	result.push_back("111332");
	result.push_back("021122");
	result.push_back("223212");
	result.push_back("201122");
	result.push_back("123122");
	result.push_back("211202");
	result.push_back("113112");
	result.push_back("211220");
	result.push_back("201212");
	result.push_back("221330");
	result.push_back("210212");
	result.push_back("212120");
	result.push_back("212021");
	result.push_back("212201");
	result.push_back("211213");
	result.push_back("212210");
	result.push_back("013112");
	result.push_back("221321");
	result.push_back("131120");
	result.push_back("031121");
	result.push_back("310121");
	result.push_back("231323");
	result.push_back("311021");
	result.push_back("311210");
	result.push_back("111031");
	result.push_back("111310");
	result.push_back("113011");
	result.push_back("333120");
	result.push_back("013111");
	result.push_back("131111");
	result.push_back("103111");
	result.push_back("232212");
	result.push_back("312113");
	result.push_back("031111");
	result.push_back("301111");
	result.push_back("330322");
	result.push_back("310111");
	result.push_back("222222");
	result.push_back("311101");
	result.push_back("311110");
	result.push_back("011233");
	result.push_back("112303");
	result.push_back("121221");
	result.push_back("112330");
	result.push_back("202133");
	result.push_back("103233");
	result.push_back("232130");
	result.push_back("220133");
	result.push_back("221303");
	result.push_back("120133");
	result.push_back("121303");
	result.push_back("121330");
	result.push_back("011322");
	result.push_back("101322");
	result.push_back("113022");
	result.push_back("113202");
	result.push_back("113220");
	result.push_back("111101");
	result.push_back("011111");
	result.push_back("101111");
	result.push_back("110111");
	result.push_back("111011");
	result.push_back("021113");
	result.push_back("211013");
	result.push_back("222230");
	result.push_back("211130");
	result.push_back("103123");
	result.push_back("311203");
	result.push_back("311230");
	result.push_back("223221");
	result.push_back("112333");
	result.push_back("101123");
	result.push_back("111023");
	result.push_back("111203");
	result.push_back("110231");
	result.push_back("112301");
	result.push_back("322311");
	result.push_back("301222");
	result.push_back("222221");
	result.push_back("312022");
	result.push_back("032221");
	result.push_back("322210");
	result.push_back("211012");
	result.push_back("211102");
	result.push_back("211120");
	result.push_back("201121");
	result.push_back("210121");
	result.push_back("112122");
	result.push_back("211021");
	result.push_back("211201");
	result.push_back("331032");
	result.push_back("331113");
	result.push_back("331302");
	result.push_back("322112");
	result.push_back("322303");
	result.push_back("331320");
	result.push_back("310323");
	result.push_back("313203");
	result.push_back("313230");
	result.push_back("322031");
	result.push_back("322301");
	result.push_back("033231");
	result.push_back("332031");
	result.push_back("232121");
	result.push_back("023123");
	result.push_back("113311");
	result.push_back("231023");
	result.push_back("231230");
	result.push_back("323121");
	result.push_back("232013");
	result.push_back("023231");
	result.push_back("230231");
	result.push_back("232031");
	result.push_back("232310");
	result.push_back("123102");
	result.push_back("123120");
	result.push_back("021312");
	result.push_back("201312");
	result.push_back("311313");
	result.push_back("213012");
	result.push_back("213120");
	result.push_back("013131");
	result.push_back("131031");
	result.push_back("131301");
	result.push_back("131310");
	result.push_back("101113");
	result.push_back("110113");
	result.push_back("111130");
	result.push_back("110223");
	result.push_back("112023");
	result.push_back("112230");
	result.push_back("011132");
	result.push_back("101132");
	result.push_back("111032");
	result.push_back("111302");
	result.push_back("101232");
	result.push_back("110232");
	result.push_back("112032");
	result.push_back("312333");
	result.push_back("103223");
	result.push_back("130223");
	result.push_back("132023");
	result.push_back("132203");
	result.push_back("102132");
	result.push_back("121032");
	result.push_back("302112");
	result.push_back("102322");
	result.push_back("321102");
	result.push_back("032211");
	result.push_back("322101");
	result.push_back("322110");
	result.push_back("031331");
	result.push_back("301331");
	result.push_back("313301");
	result.push_back("311333");
	result.push_back("330131");
	result.push_back("331031");
	result.push_back("331310");
	result.push_back("120222");
	result.push_back("122022");
	result.push_back("122202");
	result.push_back("311222");
	result.push_back("212022");
	result.push_back("021223");
	result.push_back("201223");
	result.push_back("212230");
	result.push_back("222113");
	result.push_back("221203");
	result.push_back("221230");
	result.push_back("022213");
	result.push_back("202213");
	result.push_back("220213");
	result.push_back("222103");
	result.push_back("332231");
	result.push_back("021232");
	result.push_back("212320");
	result.push_back("022132");
	result.push_back("221302");
	result.push_back("231222");
	result.push_back("120322");
	result.push_back("131113");
	result.push_back("123022");
	result.push_back("203132");
	result.push_back("123202");
	result.push_back("210322");
	result.push_back("222321");
	result.push_back("213202");
	result.push_back("213220");
	result.push_back("203221");
	result.push_back("232021");
	result.push_back("202331");
	result.push_back("321131");
	result.push_back("220331");
	result.push_back("312231");
	result.push_back("223301");
	result.push_back("223310");
	result.push_back("230132");
	result.push_back("231032");
	result.push_back("231320");
	result.push_back("023312");
	result.push_back("203312");
	result.push_back("230312");
	result.push_back("233102");
	result.push_back("233120");
	result.push_back("013233");
	result.push_back("132033");
	result.push_back("321330");
	result.push_back("223231");
	result.push_back("320331");
	result.push_back("323310");
	result.push_back("103332");
	result.push_back("133032");
	result.push_back("313321");
	result.push_back("221213");
	result.push_back("133302");
	result.push_back("301332");
	result.push_back("323322");
	result.push_back("333332");
	result.push_back("310332");
	result.push_back("222023");
	result.push_back("313032");
	result.push_back("313302");
	result.push_back("303312");
	result.push_back("321113");
	result.push_back("330312");
	result.push_back("333012");
	result.push_back("033321");
	result.push_back("330321");
	result.push_back("333201");
	result.push_back("131112");
	result.push_back("303331");
	result.push_back("330331");
	result.push_back("333031");
	result.push_back("232303");
	result.push_back("232330");
	result.push_back("023323");
	result.push_back("230323");
	result.push_back("233023");
	result.push_back("233230");
	result.push_back("303232");
	result.push_back("332320");
	result.push_back("023223");
	result.push_back("203223");
	result.push_back("232023");
	result.push_back("232230");
	result.push_back("220222");
	result.push_back("022223");
	result.push_back("222203");
	result.push_back("302223");
	result.push_back("322203");
	result.push_back("302233");
	result.push_back("320233");
	result.push_back("132322");
	result.push_back("322033");
	result.push_back("303322");
	result.push_back("333022");
	result.push_back("333202");
	result.push_back("223112");
	result.push_back("122121");
	result.push_back("212121");
	result.push_back("221121");
	result.push_back("221211");
	result.push_back("132313");
	result.push_back("323113");
	result.push_back("223313");
	result.push_back("213121");
	result.push_back("323132");
	result.push_back("231211");
	result.push_back("122211");
	result.push_back("121332");
	result.push_back("123312");
	result.push_back("312213");
	result.push_back("321213");
	result.push_back("322113");
	result.push_back("212323");
	result.push_back("223213");
	result.push_back("332112");
	result.push_back("123112");
	result.push_back("221332");
	result.push_back("223321");
	result.push_back("331312");
	result.push_back("132121");
	result.push_back("132211");
	result.push_back("121111");
	result.push_back("211111");
	result.push_back("312111");
	result.push_back("311132");
	result.push_back("112113");
	result.push_back("121113");
	result.push_back("132131");
	result.push_back("132311");
	result.push_back("311221");
	result.push_back("121213");
	result.push_back("121231");
	result.push_back("212321");
	result.push_back("311133");
	result.push_back("311331");
	result.push_back("133133");
	result.push_back("323112");
	result.push_back("331331");
	result.push_back("131223");
	result.push_back("312123");
	result.push_back("212311");
	result.push_back("312112");
	result.push_back("231333");
	result.push_back("133131");
	result.push_back("121333");
	result.push_back("123133");
	result.push_back("121322");
	result.push_back("123313");
	result.push_back("123331");
	result.push_back("331333");
	result.push_back("333313");
	result.push_back("333331");
	result.push_back("132112");
	result.push_back("211231");
	result.push_back("112223");
	result.push_back("121223");
	result.push_back("133212");
	result.push_back("132132");
	result.push_back("312132");
	result.push_back("321121");
	result.push_back("113121");
	result.push_back("321211");
	result.push_back("123211");
	result.push_back("112121");
	result.push_back("221111");
	result.push_back("132122");
	result.push_back("211123");
	result.push_back("213232");
	result.push_back("112211");
	result.push_back("113123");
	result.push_back("113213");
	result.push_back("131232");
	result.push_back("311232");
	result.push_back("233133");
	result.push_back("123322");
	result.push_back("231322");
	result.push_back("311112");
	result.push_back("311121");
	result.push_back("112313");
	result.push_back("121313");
	result.push_back("123131");
	result.push_back("313113");
	result.push_back("322233");
	result.push_back("313131");
	result.push_back("313212");
	result.push_back("332121");
	result.push_back("122221");
	result.push_back("212221");
	result.push_back("321222");
	result.push_back("322212");
	result.push_back("122322");
	result.push_back("212322");
	result.push_back("121331");
	result.push_back("213131");
	result.push_back("121133");
	result.push_back("211133");
	result.push_back("213321");
	result.push_back("233121");
	result.push_back("313213");
	result.push_back("332113");
	result.push_back("311312");
	result.push_back("113323");
	result.push_back("331122");
	result.push_back("311311");
	result.push_back("212233");
	result.push_back("222313");
	result.push_back("212231");
	result.push_back("222311");
	result.push_back("133331");
	result.push_back("123332");
	result.push_back("233213");
	result.push_back("231332");
	result.push_back("231231");
	result.push_back("233321");
	result.push_back("331323");
	result.push_back("213123");
	result.push_back("213231");
	result.push_back("113211");
	result.push_back("213132");
	result.push_back("231131");
	result.push_back("112111");
	result.push_back("113321");
	result.push_back("133121");
	result.push_back("133211");
	result.push_back("113133");
	result.push_back("131331");
	result.push_back("123212");
	result.push_back("212123");
	result.push_back("231212");
	result.push_back("311322");
	result.push_back("313221");
	result.push_back("111122");
	result.push_back("323311");
	result.push_back("321311");
	result.push_back("323111");
	result.push_back("213331");
	result.push_back("233131");
	result.push_back("123123");
	result.push_back("212313");
	result.push_back("223131");
	result.push_back("133332");
	result.push_back("313332");
	result.push_back("333132");
	result.push_back("313123");
	result.push_back("331123");
	result.push_back("332122");
	result.push_back("332221");
	result.push_back("111121");
	result.push_back("111211");
	result.push_back("223233");
	result.push_back("312211");
	result.push_back("331223");
	result.push_back("111213");
	result.push_back("312322");
	result.push_back("123222");
	result.push_back("232122");
	result.push_back("122232");
	result.push_back("221232");
	result.push_back("222132");
	result.push_back("111133");
	result.push_back("111313");
	result.push_back("121233");
	result.push_back("111333");
	result.push_back("113331");
	result.push_back("132323");
	result.push_back("321323");
	result.push_back("323123");
	result.push_back("323213");
	result.push_back("323231");
	result.push_back("111112");
	result.push_back("321333");
	result.push_back("321133");
	result.push_back("323133");
	result.push_back("323331");
	result.push_back("111312");
	result.push_back("122131");
	result.push_back("331233");
	result.push_back("332133");
	result.push_back("122112");
	result.push_back("221112");
	result.push_back("122133");
	result.push_back("122331");
	result.push_back("122333");
	result.push_back("112212");
	result.push_back("223133");
	result.push_back("223331");
	result.push_back("333113");
	result.push_back("122212");
	result.push_back("311113");
	result.push_back("231122");
	result.push_back("112232");
	result.push_back("121232");
	result.push_back("132212");
	result.push_back("312212");
	result.push_back("113131");
	result.push_back("311231");
	result.push_back("131233");
	result.push_back("312133");
	result.push_back("312331");
	result.push_back("122113");
	result.push_back("332211");
	result.push_back("213313");
	result.push_back("231313");
	result.push_back("233113");
	result.push_back("113122");
	result.push_back("133323");
	result.push_back("313323");
	result.push_back("333123");
	result.push_back("333231");
	result.push_back("132232");
	result.push_back("312232");
	result.push_back("322132");
	result.push_back("322321");
	result.push_back("331211");
	result.push_back("332111");
	result.push_back("213133");
	result.push_back("231133");
	result.push_back("313311");
	result.push_back("333111");
	result.push_back("113132");
	result.push_back("131132");
	result.push_back("111321");
	result.push_back("131121");
	result.push_back("112213");
	result.push_back("312332");
	result.push_back("323211");
	result.push_back("331111");
	result.push_back("132123");
	result.push_back("112131");
	result.push_back("232111");
	result.push_back("232132");
	result.push_back("131332");
	result.push_back("232321");
	result.push_back("123111");
	result.push_back("211122");
	result.push_back("211212");
	result.push_back("113111");
	result.push_back("311111");
	result.push_back("221133");
	result.push_back("131123");
	result.push_back("311123");
	result.push_back("111231");
	result.push_back("211121");
	result.push_back("133132");
	result.push_back("223311");
	result.push_back("313132");
	result.push_back("331321");
	result.push_back("311323");
	result.push_back("332311");
	result.push_back("231213");
	result.push_back("232113");
	result.push_back("232131");
	result.push_back("111132");
	result.push_back("321112");
	result.push_back("322111");
	result.push_back("211222");
	result.push_back("221123");
	result.push_back("212132");
	result.push_back("221132");
	result.push_back("112322");
	result.push_back("123221");
	result.push_back("231132");
	result.push_back("132331");
	result.push_back("113332");
	result.push_back("133321");
	result.push_back("313312");
	result.push_back("232313");
	result.push_back("232331");
	result.push_back("123323");
	result.push_back("213323");
	result.push_back("233123");
	result.push_back("233231");
	result.push_back("313232");
	result.push_back("332132");
	result.push_back("332312");
	result.push_back("123223");
	result.push_back("232213");
	result.push_back("122223");
	result.push_back("212223");
	result.push_back("132223");
	result.push_back("321223");
	result.push_back("322231");
	result.push_back("321233");
	result.push_back("333212");
	result.push_back("222323");
	result.push_back("223223");
	result.push_back("223232");
	result.push_back("323333");
	result.push_back("332333");
	result.push_back("333323");
	result.push_back("232333");
	result.push_back("233233");
	result.push_back("233323");
	result.push_back("233222");
	result.push_back("223332");
	result.push_back("332332");
	result.push_back("333232");
	result.push_back("323223");
	result.push_back("332232");
	result.push_back("222232");
	result.push_back("323232");
	result.push_back("322333");
	result.push_back("323233");
	result.push_back("332233");
	result.push_back("222333");
	result.push_back("223323");
	result.push_back("333223");
	result.push_back("322232");
	result.push_back("332322");
	result.push_back("232223");
	result.push_back("222223");
	result.push_back("322223");
	result.push_back("333222");
}


struct part_id {
    long validity;
    long id_type;
    std::string id;

    part_id() {
        validity = PART_OK;
    }
};

struct camera_info {
    long validity_id;
    long station_id;
    std::string camera_id;

    camera_info(long v_id, long s_id, std::string cam_id) {
        validity_id = v_id;
        station_id = s_id;
        camera_id = cam_id;
    }
};

struct part_renew_id {
    long validity;
    long id_type;
    long station_id;
    std::string id;
    std::string date;

    part_renew_id() {
        station_id = -1;
    }
};

void
GetColors(std::vector<std::string> &color_hex_value1, std::vector<std::string> &color_hex_value2,
          std::string &qr_code_string) {

    color_hex_value1.clear();
    color_hex_value2.clear();
    qr_code_string.clear();
    for (int i = 0, k = 0; i < final_numbers.size(); i++) {
        for (int j = 0; j < final_numbers[i].second.size(); j++) {
            char add_c[6];


//            _itoa_s(final_numbers[i].second[j], add_c, 6, 16);
            snprintf(add_c, 6, "%lx", static_cast<unsigned long>(final_numbers[i].second[j]));


            qr_code_string.append(add_c);
            qr_code_string.append("-");
        }

        if (final_numbers[i].first < MAX_SUM_VALUE) {
            if (color_hex_value1.size() == 4) {
                int mod_value = k % 4;
                unsigned int prev_value;
                std::stringstream ss;
                ss << std::hex << color_hex_value1[mod_value].c_str();
                ss >> prev_value;
                int add_value = prev_value + final_numbers[i].first;
                char color_hex[50];
//                _itoa_s(add_value, color_hex, 10, 16);
                snprintf(color_hex, 10, "%x", add_value);


                color_hex_value1[mod_value].clear();
                color_hex_value1[mod_value].append(color_hex);
            } else {
                char color_hex[50];
//                _itoa_s(final_numbers[i].first, color_hex, 10, 16);
				snprintf(color_hex, 10, "%lx", static_cast<unsigned long>(final_numbers[i].first));


                color_hex_value1.push_back(color_hex);
            }
            k++;
        }
    }

    for (int i = 0, k = 0; i < final_reverse_numbers.size(); i++) {
        if (final_reverse_numbers[i].first < MAX_SUM_VALUE) {
            if (color_hex_value2.size() == 4) {
                int mod_value = k % 4;
                unsigned int prev_value;
                std::stringstream ss;
                ss << std::hex << color_hex_value2[mod_value].c_str();
                ss >> prev_value;
                int add_value = prev_value + final_reverse_numbers[i].first;
                char color_hex[50];
//                _itoa_s(add_value, color_hex, 10, 16);
                snprintf(color_hex, 10, "%x", add_value);


                color_hex_value2[mod_value].clear();
                color_hex_value2[mod_value].append(color_hex);
            } else {
                char color_hex[50];
//                _itoa_s(final_reverse_numbers[i].first, color_hex, 10, 16);
                // snprintf(color_hex, 10, "%x", final_reverse_numbers[i].first);

				snprintf(color_hex, 10, "%lx", static_cast<unsigned long>(final_reverse_numbers[i].first));
                color_hex_value2.push_back(color_hex);
            }
            k++;
        }
    }

    for (int i = 0; i < color_hex_value1.size(); i++) {
        if (color_hex_value1[i].length() < 6) {
            long diff = 6 - (long) color_hex_value1[i].length();
            for (int j = 0; j < diff; j++) {
                color_hex_value1[i].insert(color_hex_value1[i].begin(), '0');
            }
        }
    }

    for (int i = 0; i < color_hex_value2.size(); i++) {
        if (color_hex_value2[i].length() < 6) {
            long diff = 6 - (long) color_hex_value2[i].length();
            for (int j = 0; j < diff; j++) {
                color_hex_value2[i].insert(color_hex_value2[i].begin(), '0');
            }
        }
    }

}

void GetCharPattern(char c, int position, std::string &char_pattern) {

    int char_type = -1, index = -1;
    if (int(c) >= 65 && int(c) <= 90) {
        char_type = CAPITAL_CHAR;
        index = int(c) - 65;
    } else if (int(c) >= 97 && int(c) <= 122) {
        char_type = SMALL_CHAR;
        index = int(c) - 97;
    } else if (int(c) >= 48 && int(c) <= 57) {
        char_type = NUMBER;
        index = int(c) - 48;
    }

    if (char_type == NUMBER) {
        if (number_patterns.size() < position) {
            char_pattern = dummy_pattern[position];
        } else {
            char_pattern = number_patterns[position][index];
        }
    } else if (char_type == CAPITAL_CHAR) {
        if (capital_char_patterns.size() < position) {
            char_pattern = dummy_pattern[position];
        } else {
            char_pattern = capital_char_patterns[position][index];
        }
    } else if (char_type == SMALL_CHAR) {
        if (small_char_patterns.size() < position) {
            char_pattern = dummy_pattern[position];
        } else {
            char_pattern = small_char_patterns[position][index];
        }
    } else {
        char_pattern = dummy_pattern[position];
    }
}

void FindNumbers(std::vector<std::string> &string_for_encoding, bool append_numbers = false) {

    if (!append_numbers) {
        final_numbers.clear();
        final_reverse_numbers.clear();
    }

    if (string_for_encoding.size() == 0) {
        return;
    }

    for (int id = 0; id < string_for_encoding.size(); id += 2) {
        std::pair<long, std::vector<long> > numbers_per_string_pair;
        numbers_per_string_pair.first = 0;
        for (int i = 0; i < string_for_encoding[id].size(); i++) {
            std::string added_pattern;

            std::string char_pattern1;
            char c1 = string_for_encoding[id][i];
            GetCharPattern(c1, 0, char_pattern1);

            std::string char_pattern2;
            char c2 = string_for_encoding[id + 1][i];
            GetCharPattern(c2, 1, char_pattern2);

            for (int j = 0; j < char_pattern1.size(); j++) {
                char c[2] = "\0";
                c[0] = char_pattern1[j];
                int n1 = atoi(c);
                c[0] = char_pattern2[j];
                int n2 = atoi(c);
                char add_c[2];
//                _itoa_s(n1 + n2, add_c, 2, 10);
                snprintf(add_c, 2, "%d", n1 + n2);


                added_pattern.push_back(add_c[0]);
            }

            std::vector<std::string>::iterator iter = std::find(three_char_combinations.begin(),
                                                                three_char_combinations.end(),
                                                                added_pattern);
            int dist = (int) std::distance(three_char_combinations.begin(), iter);

            numbers_per_string_pair.second.push_back(dist);
            numbers_per_string_pair.first += dist;
        }
        final_numbers.push_back(numbers_per_string_pair);

        std::pair<long, std::vector<long> > numbers_per_string_pair_reverse;
        numbers_per_string_pair_reverse.first = 0;
        for (int i = (int) string_for_encoding[id].size() - 1, j = 0; i >= 0; i--, j++) {
            std::string added_pattern;

            std::string char_pattern1;
            char c1 = string_for_encoding[id][i];
            GetCharPattern(c1, 0, char_pattern1);

            std::string char_pattern2;
            char c2 = string_for_encoding[id + 1][j];
            GetCharPattern(c2, 1, char_pattern2);

            for (int k = 0; k < char_pattern1.size(); k++) {
                char c[2] = "\0";
                c[0] = char_pattern1[k];
                int n1 = atoi(c);
                c[0] = char_pattern2[k];
                int n2 = atoi(c);
                char add_c[2];
//                _itoa_s(n1 + n2, add_c, 2, 10);
                snprintf(add_c, 2, "%d", n1 + n2);


                added_pattern.push_back(add_c[0]);
            }

            std::vector<std::string>::iterator iter = std::find(three_char_combinations.begin(),
                                                                three_char_combinations.end(),
                                                                added_pattern);
            int dist = (int) std::distance(three_char_combinations.begin(), iter);

            numbers_per_string_pair_reverse.second.push_back(dist);
            numbers_per_string_pair_reverse.first += dist;
        }
        final_reverse_numbers.push_back(numbers_per_string_pair_reverse);
    }
    std::vector<long> eof;
    eof.push_back(MAX_SUM_VALUE);
    final_numbers.push_back(std::pair<long, std::vector<long>>(MAX_SUM_VALUE, eof));
    final_reverse_numbers.push_back(std::pair<long, std::vector<long>>(MAX_SUM_VALUE, eof));
}

void GetCurrentDate(std::string &current_date) {

    current_date.clear();
    time_t t = time(0);
    struct tm buf;

//    buf = localtime(&t);

//        localtime_s(&buf, &t);

    localtime_r(reinterpret_cast<const time_t *>(&buf), reinterpret_cast<tm *>(&t));

    char temp_c[10];

    snprintf(temp_c, 10, "%d", buf.tm_mday);

    if (temp_c[1] == '\0') {
        current_date.append("0");
    }
    current_date.append(temp_c);

//    _itoa_s(buf.tm_mon + 1, temp_c, 10, 10);
    snprintf(temp_c, 10, "%d", buf.tm_mon + 1);

    if (temp_c[1] == '\0') {
        current_date.append("0");
    }
    current_date.append(temp_c);

//    _itoa_s(buf.tm_year + 1900, temp_c, 10, 10);
    snprintf(temp_c, 10, "%d", buf.tm_year + 1900);


    current_date.append(temp_c);
}

void GetValidSerialId(std::string &input, std::string &output, long max_serial_lenght) {

    output.clear();
    for (int i = 0; i < input.length(); i++) {
        char c = input.at(i);
        if ((int(c) >= 65 && int(c) <= 90) ||
            (int(c) >= 97 && int(c) <= 122) ||
            (int(c) >= 48 && int(c) <= 57)/* ||
										  int(c) == 45 ||
										  int(c) == 47 ||
										  int(c) == 92*/) {
            output.append(&c, 1);
        }
    }
    long diff = max_serial_lenght - (long) output.size();
    if (output.size() <= max_serial_lenght) {
        for (int i = 0; i < diff; i++) {
            output.insert(output.begin(), '~');
        }
    } else {
        long ignore_length = (long) output.length() - max_serial_lenght;
        for (int i = 0; i < ignore_length; i++) {
            output.pop_back();
        }
    }
}



void
GetValidSerialId2(long validity_id, long hardware_index, std::string &input, std::string &output,
                  long max_serial_lenght) {

    output.clear();

    char c[10];
//    _itoa_s(hardware_index, c, 10, 10);
    // snprintf(c, 10, "%d", hardware_index);
	snprintf(c, 10, "%ld", static_cast<unsigned long>(hardware_index));

    output.insert(output.begin(), c[0]);

//    _itoa_s(validity_id, c, 10, 10);
    // snprintf(c, 10, "%x", validity_id);
	snprintf(c, 10, "%lx", static_cast<unsigned long>(validity_id));
    output.insert(output.begin(), c[0]);

    for (int i = 0; i < input.length(); i++) {
        char c = input.at(i);
        if ((int(c) >= 65 && int(c) <= 90) ||
            (int(c) >= 97 && int(c) <= 122) ||
            (int(c) >= 48 && int(c) <= 57)) {
            output.append(&c, 1);
        }
    }

    long diff = max_serial_lenght - (long) output.size();
    if (output.size() <= max_serial_lenght) {
        for (int i = 0; i < diff; i++) {
            output.insert(output.begin(), '~');
        }
    } else {
        long ignore_length = (long) output.length() - max_serial_lenght;
        for (int i = 0; i < ignore_length; i++) {
            output.pop_back();
        }
    }
}

void PrepareStringForEncoding(std::string &invoice_id, std::string &po_id, long machine_id,
                              part_id &hdd_id,
                              part_id &gu_id, part_id &io_id, std::vector<camera_info> &camera_ids,
                              part_id &product_id,
                              std::vector<std::string> &string_for_encoding,
                              const std::string &date_time) {


    std::string current_date_time;
    if (date_time == "") {
        GetCurrentDate(current_date_time);
    } else {
        current_date_time = date_time;
    }

    string_for_encoding.clear();

    //INSERTING DUMMY CHAR '~' TO MAKE ALL THE SERIAL NUMBERS OF SAME LENGTH
    std::string valid_id = "";

    GetValidSerialId(current_date_time, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);

    GetValidSerialId(invoice_id, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);

    GetValidSerialId(po_id, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);

    GetValidSerialId2(hdd_id.validity, HDD_INDEX, hdd_id.id, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);

    GetValidSerialId2(gu_id.validity, GU_INDEX, gu_id.id, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);

    GetValidSerialId2(io_id.validity, IO_INDEX, io_id.id, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);

    GetValidSerialId2(product_id.validity, PRODUCT_INDEX, product_id.id, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);

    for (int i = 0; i < camera_ids.size(); i++) {
        std::string camera_id_with_station_id = camera_ids[i].camera_id;
        char c[10];
//        _itoa_s(camera_ids[i].station_id, c, 10, 10);
        // snprintf(c, 10, "%d", camera_ids[i].station_id);
		snprintf(c, 10, "%ld", static_cast<unsigned long>(camera_ids[i].station_id));

        camera_id_with_station_id.insert(camera_id_with_station_id.begin(), c[0]);
//        _itoa_s(machine_id, c, 10, 10);
        // snprintf(c, 10, "%d", machine_id);
		snprintf(c, 10, "%ld", static_cast<unsigned long>(machine_id));

        camera_id_with_station_id.insert(camera_id_with_station_id.begin(), c[0]);

        GetValidSerialId2(camera_ids[i].validity_id, CAM_INDEX, camera_id_with_station_id, valid_id,
                          MAX_ID_LENGTH);
        string_for_encoding.push_back(valid_id);
        //string_for_encoding.push_back(valid_id);
    }

    //MAKING DUMMY STRING ID OF MAX SERIAL KEY LENGTH
    std::string dummy_id;
    for (int i = 0; i < MAX_ID_LENGTH; i++) {
        dummy_id.push_back('~');
    }

    long total_given_ids = 7 + (long) camera_ids.size();
    long total_ids = total_given_ids + (total_given_ids % 2);
    total_ids = total_ids < 8 ? 8 : total_ids;
    for (int i = 0; i < total_ids - total_given_ids; i++) {
        string_for_encoding.push_back(dummy_id);
    }
}




void RemoveDummyChar(std::string &input, std::string &output) {

    output.clear();
    for (int i = 0; i < input.length(); i++) {
        char c = input.at(i);
        if (c != '~') {
            output.append(&c, 1);
        }
    }
}



void
RemoveDummyChar(std::string &input, std::string &output, long &hardware_id, long &validity_id) {

    bool first_valid_char_taken = false;
    bool second_valid_char_taken = false;
    output.clear();
    for (int i = 0; i < input.length(); i++) {
        char c[2] = "\0";
        c[0] = input.at(i);
        if (c[0] != '~') {
            if (!first_valid_char_taken) {
                validity_id = atoi(c);
                first_valid_char_taken = true;
                continue;
            }
            if (!second_valid_char_taken) {
                hardware_id = atoi(c);
                second_valid_char_taken = true;
                continue;
            }
            output.append(c, 1);
        }
    }


}


void GetCharFromPattern(std::string &char_pattern, int position, char &c) {
    
std::vector<std::string>::iterator iter1 = std::find(capital_char_patterns[position].begin(),
                                                     capital_char_patterns[position].end(),
                                                     char_pattern);


    if (iter1 == capital_char_patterns[position].end()) {
        std::vector<std::string>::iterator iter2 = std::find(small_char_patterns[position].begin(),
                                                             small_char_patterns[position].end(),
                                                             char_pattern);
        if (iter2 == small_char_patterns[position].end()) {
            std::vector<std::string>::iterator iter3 = std::find(number_patterns[position].begin(),
                                                                 number_patterns[position].end(),
                                                                 char_pattern);
            if (iter3 == number_patterns[position].end()) {
                if (dummy_pattern[position] == char_pattern) {
                    c = '~';
                }
            } else {
                long dist = long(iter3 - number_patterns[position].begin());
                long ascii = 48 + dist;
                c = (char) ascii;
            }
        } else {
            long dist = long(iter2 - small_char_patterns[position].begin());
            long ascii = 97 + dist;
            c = (char) ascii;
        }
    } else {
        long dist = long(iter1 - capital_char_patterns[position].begin());
        long ascii = 65 + dist;
        c = (char) ascii;
    }
}

void GetCharPairFromTuple(std::string &tuple, char &char1, char &char2) {

    unsigned int int_value;
    std::stringstream ss;
    ss << std::hex << tuple.c_str();
    ss >> int_value;
    


    auto jump = three_char_combinations.begin();
    std::advance(jump, int_value);
    std::string added_string = jump->c_str();

    std::string string1, string2;
    
                    // std::printf("\n Tuple: %s\n", tuple.c_str());
                    // std::printf("\n Tuple: %d\n", added_string.size());

    for (int i = 0; i < added_string.size(); i++) {
                   

        char c[2] = "\0";
        c[0] = added_string[i];
        int x = atoi(c);
        //   std::printf("Tuple: %d\n", x);
        if (x == 0) {
            string1.append("0");
            string2.append("0");
        } else if (x == 1) {
            string1.append("1");
            string2.append("0");
        } else if (x == 2) {
            string1.append("0");
            string2.append("2");
        } else if (x == 3) {
            string1.append("1");
            string2.append("2");
        }
                //   std::printf("s1: %s,  S2 : %s\n", string1.c_str(),string2.c_str());

    }

    GetCharFromPattern(string1, 0, char1);
    GetCharFromPattern(string2, 1, char2);
}

std::string
RetriveInfoFromQR(std::string &qr_string, std::string &first_gen_date_time, std::string &invoice_id,
                  std::string &po_id,
                  long &machine_id, part_id &hdd_id, part_id &gu_id, part_id &io_id,
                  part_id &product_id, std::vector<camera_info> &camera_ids,
                  std::vector<part_renew_id> &renew_ids,
                  std::vector<std::string> &color_hex_value1,
                  std::vector<std::string> &color_hex_value2) {
    std::string lic_info = "";
    if (qr_string.length() < 1) {
//        return false;
        return lic_info;
    }

    first_gen_date_time.clear();
    invoice_id.clear();
    po_id.clear();
    hdd_id.id.clear();
    gu_id.id.clear();
    io_id.id.clear();
    product_id.id.clear();
    camera_ids.clear();
    renew_ids.clear();

    std::vector<std::string> serial_string;
    std::vector<std::vector<std::string>> serial_strings;
    long count_dash = 0;
    std::string string1 = "", string2 = "";
    std::string::iterator pre_seperator_iter = qr_string.begin();

    while (pre_seperator_iter != qr_string.end()) {
        std::string::iterator seperator_iter = std::find(pre_seperator_iter, qr_string.end(), '-');
        if (seperator_iter != qr_string.end()) {
            std::string tuple;
            tuple.assign(pre_seperator_iter, seperator_iter);
            char max_hex[6];
//            _itoa_s(MAX_SUM_VALUE, max_hex, 6, 16);
            snprintf(max_hex, 6, "%x", MAX_SUM_VALUE);

            if (tuple == max_hex) {
                serial_strings.push_back(serial_string);
                serial_string.clear();
                pre_seperator_iter = ++seperator_iter;
                continue;
            }
            char char1, char2;
            GetCharPairFromTuple(tuple, char1, char2);
            // printf("Char1 %c , char2 %c",char1,char2);
            pre_seperator_iter = ++seperator_iter;
            count_dash++;
            if (count_dash < MAX_ID_LENGTH) {
                string1.append(1, char1);
                string2.append(1, char2);
            } else {
                string1.append(1, char1);
                string2.append(1, char2);
                count_dash = 0;
                serial_string.push_back(string1);
                serial_string.push_back(string2);
                string1.clear();
                string2.clear();
            }
        }
    }

    for (int renew_index = 0; renew_index < serial_strings.size(); renew_index++) {
        if (renew_index == 0) {    //Primary Serial Information
            RemoveDummyChar(serial_strings[renew_index][0], first_gen_date_time);
            RemoveDummyChar(serial_strings[renew_index][1], invoice_id);
            RemoveDummyChar(serial_strings[renew_index][2], po_id);
            lic_info.append("\nINVOIC_NO : " + invoice_id);
            lic_info.append("\nPO_ID : " + po_id);
            RemoveDummyChar(serial_strings[renew_index][3], hdd_id.id, hdd_id.id_type,
                            hdd_id.validity);
            RemoveDummyChar(serial_strings[renew_index][4], gu_id.id, gu_id.id_type,
                            gu_id.validity);
            RemoveDummyChar(serial_strings[renew_index][5], io_id.id, io_id.id_type,
                            io_id.validity);
            RemoveDummyChar(serial_strings[renew_index][6], product_id.id, product_id.id_type,
                            product_id.validity);
//            lic_info.append("\nPRODUCT_ID : " + po_id);
            for (int i = 7; i < serial_strings[renew_index].size(); i++) {
                std::string camera_serial;
                long part_id = -2, validity_id = -2;
                RemoveDummyChar(serial_strings[renew_index][i], camera_serial, part_id,
                                validity_id);
                if (camera_serial.length() <= 0) {
                    continue;
                }
                char c[2] = "\0";
                c[0] = camera_serial.at(0);
                machine_id = atoi(c);
                c[0] = camera_serial.at(1);
                long station_id = atoi(c);

                camera_info cam_info(validity_id, station_id, "");
                for (int j = 2; j < camera_serial.length(); j++) {
                    char c = camera_serial.at(j);
                    cam_info.camera_id.append(&c, 1);
                }
                camera_ids.push_back(cam_info);
//                lic_info.append("\nCAMERA_NO : " + camera_serial);

            }
        } else {    //Secondary Serial Information
            for (int j = 0; j < serial_strings[renew_index].size(); j += 2) {
                part_renew_id renew_id;
                RemoveDummyChar(serial_strings[renew_index][j], renew_id.id, renew_id.id_type,
                                renew_id.validity);
                if (renew_id.id_type == CAM_INDEX) {
                    char c[2] = "\0";
                    c[0] = renew_id.id.at(1);
                    renew_id.station_id = atoi(c);

                    std::string temp_string = "";
                    for (int j = 2; j < renew_id.id.length(); j++) {
                        char c = renew_id.id.at(j);
                        temp_string.append(&c, 1);
                    }
                    renew_id.id = temp_string;
                }
                RemoveDummyChar(serial_strings[renew_index][j + 1], renew_id.date);
                renew_ids.push_back(renew_id);
//                lic_info.append("\nCAMERA_NO : " + renew_id.id);
            }
        }
    }

    std::vector<std::string> string_for_encoding;
    std::string qr_code_string;
    PrepareStringForEncoding(invoice_id, po_id, machine_id, hdd_id, gu_id, io_id,
                             camera_ids, product_id, string_for_encoding, first_gen_date_time);
    FindNumbers(string_for_encoding);
    GetColors(color_hex_value1, color_hex_value2, qr_code_string);

    if (renew_ids.size() == 0) {
        return lic_info;
    }

    for (int i = 0; i < renew_ids.size(); i++) {
        std::string valid_id;
        std::string id = renew_ids[i].id;
        if (renew_ids[i].id_type == CAM_INDEX) {
            char c[10];
//            _itoa_s(renew_ids[i].station_id, c, 10, 10);
            // snprintf(c, 10, "%d", renew_ids[i].station_id);
			snprintf(c, 10, "%ld", static_cast<unsigned long>(renew_ids[i].station_id));

            id.insert(id.begin(), c[0]);
//            _itoa_s(machine_id, c, 10, 10);
            // snprintf(c, 10, "%d", machine_id);
			snprintf(c, 10, "%ld", static_cast<unsigned long>(machine_id));

            id.insert(id.begin(), c[0]);
        }

        GetValidSerialId2(renew_ids[i].validity, renew_ids[i].id_type, id, valid_id, MAX_ID_LENGTH);
        string_for_encoding.push_back(valid_id);
        GetValidSerialId(renew_ids[i].date, valid_id, MAX_ID_LENGTH);
        string_for_encoding.push_back(valid_id);
    }
    std::string dummy_id;
    for (int i = 0; i < MAX_ID_LENGTH; i++) {
        dummy_id.push_back('~');
    }

    long new_addition_size = (long) renew_ids.size() * 2;
    long total_ids = new_addition_size + (new_addition_size % 2);
    for (int i = 0; i < total_ids - new_addition_size; i++) {
        string_for_encoding.push_back(dummy_id);
    }
    FindNumbers(string_for_encoding);
    GetColors(color_hex_value1, color_hex_value2, qr_code_string);
    return lic_info;
}

void Initialize() {

    machine_name_index_map.insert({0, PHARMA_BLISTER_PACK_MACHINE});
    machine_name_index_map.insert({1, PHARMA_CARTONING_MACHINE});
    machine_name_index_map.insert({2, PHARMA_CASE_PACKER_MACHINE});
    machine_name_index_map.insert({3, PHARMA_LABELLING_MACHINE});
    machine_name_index_map.insert({4, PHARMA_TABLET_COUNTING_MACHINE});
    machine_name_index_map.insert({5, PHARMA_MICROTABLET_MACHINE});
    machine_name_index_map.insert({6, PHARMA_CONTAINER_COUNTING_MACHINE});
    machine_name_index_map.insert({7, PHARMA_SACHET_FILLING_MACHINE});
    machine_name_index_map.insert({8, PHARMA_PUNCH_INSPECTION_MACHINE});
    machine_name_index_map.insert({9, PHARMA_PRINT_AND_CHECK_MACHINE});
    machine_name_index_map.insert({10, PHARMA_SEAL_INSPECTION_MACHINE});
    machine_name_index_map.insert({11, PHARMA_FFS_RESPULES_MACHINE});





    capital_char_patterns.clear();
    small_char_patterns.clear();
    number_patterns.clear();
    three_char_combinations.clear();

    //GENERATING CHAR PATTERN
    std::string chars;
    chars.push_back('0');
    chars.push_back('1');
    std::vector<std::string> result1;
    GetTwoCharCombination(result1);

    chars.clear();
    chars.push_back('0');
    chars.push_back('1');
    chars.push_back('2');
    chars.push_back('3');
    //three_char_combinations = PermuteString(6, chars);
    GetFourCharCombination(three_char_combinations);

    long total_numbers = 10, number_count = 0;
    long total_capital_chars = 26, cap_char_count = 0;
    long total_small_chars = 26, small_char_count = 0;

    if (result1.size() == 64) {
        number_patterns.resize(2);
        capital_char_patterns.resize(2);
        small_char_patterns.resize(2);

        std::vector<std::string>::iterator result_iter1 = result1.begin();
        for (; result_iter1 != result1.end(); result_iter1++) {
            if (result_iter1->c_str() != "000000") {

                std::string second_string = result_iter1->data();
                for (int i = 0; i < second_string.size(); i++) {
                    if (second_string[i] == '1') {
                        second_string[i] = '2';
                    }
                }

                if (number_count < total_numbers) {
                    number_patterns[0].push_back(result_iter1->data());
                    number_patterns[1].push_back(second_string);
                    number_count++;
                } else if (cap_char_count < total_capital_chars) {
                    capital_char_patterns[0].push_back(result_iter1->data());
                    capital_char_patterns[1].push_back(second_string);
                    cap_char_count++;
                } else if (small_char_count < total_small_chars) {
                    small_char_patterns[0].push_back(result_iter1->data());
                    small_char_patterns[1].push_back(second_string);
                    small_char_count++;
                } else {
                    dummy_pattern[0] = result_iter1->data();
                    dummy_pattern[1] = second_string;
                }
            }
        }
    }
}

std::string GetMachineName(long machine_id) {

    auto iter = machine_name_index_map.begin();
    while (iter != machine_name_index_map.end()) {
        if (iter->first == machine_id) {
            return iter->second;
        }
        iter++;
    }
    return "";
}
std::string getProductNumber(std::string cameraNo) {
    std::string product_code = cameraNo;
    unsigned int product_code_value;
    std::stringstream ss;
    int lic_value;
    ss << std::hex << product_code;
    ss >> product_code_value;

    std::string product_number = "";
    for (int product_index = 0; product_index < 64; product_index++) {
        lic_value = (product_code_value >> product_index) & 0x01;
        if (lic_value == 1) {
            if (product_number == "") {
                product_number = product_number + std::to_string(product_index);
            } else {
                product_number = product_number + "," + std::to_string(product_index);
            }

        }
        //lic_value = 0 or 1;
    }
    return product_number;
}












void PrepareAppendStringForEncoding(long machine_id, part_id &hdd_id, part_id &gu_id, part_id &io_id,
	std::vector<camera_info> &camera_ids, part_id &product_id,
	std::vector<std::string> &string_for_encoding) {

	std::string current_date_time, current_date_time2;
	GetCurrentDate(current_date_time2);

	string_for_encoding.clear();

	//INSERTING DUMMY CHAR '~' TO MAKE ALL THE SERIAL NUMBERS OF SAME LENGTH
std::string valid_id = "";

	GetValidSerialId(current_date_time2, current_date_time, MAX_ID_LENGTH);

	long total_pair_inserted = 0;
	if (hdd_id.validity == PART_OK) {
		GetValidSerialId2(PART_OK, HDD_INDEX, hdd_id.id, valid_id, MAX_ID_LENGTH);
		string_for_encoding.push_back(valid_id);
		string_for_encoding.push_back(current_date_time);
		total_pair_inserted += 2;
	}

	if (gu_id.validity == PART_OK) {
		GetValidSerialId2(PART_OK, GU_INDEX, gu_id.id, valid_id, MAX_ID_LENGTH);
		string_for_encoding.push_back(valid_id);
		string_for_encoding.push_back(current_date_time);
		total_pair_inserted += 2;
	}

	if (io_id.validity == PART_OK) {
		GetValidSerialId2(PART_OK, IO_INDEX, io_id.id, valid_id, MAX_ID_LENGTH);
		string_for_encoding.push_back(valid_id);
		string_for_encoding.push_back(current_date_time);
		total_pair_inserted += 2;
	}

	if (product_id.validity == PART_OK) {
		GetValidSerialId2(PART_OK, PRODUCT_INDEX, product_id.id, valid_id, MAX_ID_LENGTH);
		string_for_encoding.push_back(valid_id);
		string_for_encoding.push_back(current_date_time);
		total_pair_inserted += 2;
	}

// 	for (int i = 0; i < camera_ids.size(); i++) {
// 		std::string camera_id_with_station_id = camera_ids[i].camera_id;
// 		char c[10];
// 		_itoa_s(camera_ids[i].station_id, c, 10, 10);
// 		camera_id_with_station_id.insert(camera_id_with_station_id.begin(), c[0]);
// 		_itoa_s(machine_id, c, 10, 10);
// 		camera_id_with_station_id.insert(camera_id_with_station_id.begin(), c[0]);

// 		GetValidSerialId(PART_OK, CAM_INDEX, camera_id_with_station_id, valid_id, MAX_ID_LENGTH);
// 		string_for_encoding.push_back(valid_id);
// 		string_for_encoding.push_back(current_date_time);
// 		total_pair_inserted += 2;
// 	}

for (size_t i = 0; i < camera_ids.size(); i++) {
        std::string camera_id_with_station_id = camera_ids[i].camera_id;
        
        // Convert station_id to string and insert at the beginning
        std::string station_id_str = std::to_string(camera_ids[i].station_id);
        camera_id_with_station_id.insert(0, station_id_str);

        // Convert machine_id to string and insert at the beginning
        std::string machine_id_str = std::to_string(machine_id);
        camera_id_with_station_id.insert(0, machine_id_str);

        GetValidSerialId2(PART_OK, CAM_INDEX, camera_id_with_station_id, valid_id, MAX_ID_LENGTH);
        string_for_encoding.push_back(valid_id);
        string_for_encoding.push_back(current_date_time);
        total_pair_inserted += 2;
    }

	//MAKING DUMMY STRING ID OF MAX SERIAL KEY LENGTH
	std::string dummy_id;
	for (int i = 0; i < MAX_ID_LENGTH; i++) {
		dummy_id.push_back('~');
	}

	long total_ids = total_pair_inserted + (total_pair_inserted % 2);
	for (int i = 0; i < total_ids - total_pair_inserted; i++) {
		string_for_encoding.push_back(dummy_id);
	}
}

void DiscardInvalidChar(std::string &input, std::string &output, long max_serial_lenght) {

	output.clear();
	for (int i = 0; i < input.length(); i++) {
		char c = input.at(i);
		if ((int(c) >= 65 && int(c) <= 90) || (int(c) >= 97 && int(c) <= 122) || (int(c) >= 48 && int(c) <= 57)) {
			output.append(&c, 1);
		}
	}
	long diff = max_serial_lenght - (long)output.size();
	if (output.size() > max_serial_lenght) {
		long ignore_length = (long)output.length() - max_serial_lenght;
		for (int i = 0; i < ignore_length; i++) {
			output.pop_back();
		}
	}
}


bool is_not_digit(char c) {
	return !std::isdigit(c);
}


bool numeric_string_compare(const std::string& s1, const std::string& s2) {
	// handle empty strings...

	std::string::const_iterator it1 = s1.begin(), it2 = s2.begin();

	if (std::isdigit(s1[0]) && std::isdigit(s2[0])) {
		int n1, n2;
		std::stringstream ss(s1);
		ss >> n1;
		ss.clear();
		ss.str(s2);
		ss >> n2;

		if (n1 != n2) return n1 < n2;

		it1 = std::find_if(s1.begin(), s1.end(), is_not_digit);
		it2 = std::find_if(s2.begin(), s2.end(), is_not_digit);
	}

	return std::lexicographical_compare(it1, s1.end(), it2, s2.end());
}

void SortCameraId(std::vector<std::pair<long, std::string>> &camera_ids) {
	for (int i = 0; i < camera_ids.size(); i++) {
		for (int j = i + 1; j < camera_ids.size(); j++) {
			if (numeric_string_compare(camera_ids[i].second, camera_ids[j].second)) {
				std::pair<long, std::string> temp_pair;
				temp_pair = camera_ids[j];
				camera_ids[j] = camera_ids[i];
				camera_ids[i] = temp_pair;
			}
		}
	}
}

bool StringMatching(std::string &key_word, std::string &string) {
	std::string out_string;
	DiscardInvalidChar(string, out_string, MAX_ID_LENGTH);
	if (key_word.length() > out_string.length()) {
		return false;
	}
	for (int i = 0; i < key_word.length(); i++) {
		if (key_word.at(i) != out_string.at(i)) {
			return false;
		}
	}
	return true;
}


bool RenewLicense(std::string &qr_string, long machine_id,
                  std::string &hdd_id_string, std::string &gu_id_string, std::string &io_id_string,
                  std::vector<std::pair<long, std::string>> &camera_ids, std::string &product_id_string,
                  std::vector<std::string> &color_hex_value1, std::vector<std::string> &color_hex_value2,
                  std::string &qr_code_string, const std::string &date_time) {
    if (hdd_id_string.empty() || gu_id_string.empty() || io_id_string.empty() || camera_ids.empty() || product_id_string.empty() || qr_string.empty()) {
        return false;
    }

    // Local variable names changed to avoid shadowing
    part_id hddId, guId, ioId, productId;
    std::vector<camera_info> cameraInfos;
    std::vector<part_renew_id> renewIds;
    std::string first_gen_date_time, invoice_id, po_id;

    // Assuming RetriveInfoFromQR is correctly defined and linked
    RetriveInfoFromQR(qr_string, first_gen_date_time, invoice_id, po_id, machine_id, hddId, guId, ioId, productId, cameraInfos, renewIds, color_hex_value1, color_hex_value2);


	bool hdd_id_found = false, gu_id_found = false, io_id_found = false, product_id_found = false;
	std::string valid_id;
	hddId.validity = PART_OK;
	DiscardInvalidChar(hdd_id_string, valid_id, MAX_ID_LENGTH - 2);
	if (valid_id != hddId.id) {
		hddId.validity = PART_NOT_IN_USE;
		for (int i = 0; i < renewIds.size(); i++) {
			if (renewIds[i].id_type == HDD_INDEX) {
				if (renewIds[i].id == valid_id && renewIds[i].validity == PART_OK) {
					hdd_id_found = true;
					break;
				} else{
					renewIds[i].validity = PART_NOT_IN_USE;
				}
			}
		}
	} else {
		hdd_id_found = true;
	}

	guId.validity = PART_OK;
	DiscardInvalidChar(gu_id_string, valid_id, MAX_ID_LENGTH - 2);
	if (valid_id != guId.id) {
		guId.validity = PART_NOT_IN_USE;
		for (int i = 0; i < renewIds.size(); i++) {
			if (renewIds[i].id_type == GU_INDEX) {
				if (renewIds[i].id == valid_id && renewIds[i].validity == PART_OK) {
					gu_id_found = true;
					break;
				} else { 
					renewIds[i].validity = PART_NOT_IN_USE;
				}
			}
		}
	} else {
		gu_id_found = true;
	}

	ioId.validity = PART_OK;
	DiscardInvalidChar(io_id_string, valid_id, MAX_ID_LENGTH - 2);
	if (valid_id != ioId.id) {
		ioId.validity = PART_NOT_IN_USE;
		for (int i = 0; i < renewIds.size(); i++) {
			if (renewIds[i].id_type == IO_INDEX) {
				if (renewIds[i].id == valid_id && renewIds[i].validity == PART_OK) {
					io_id_found = true;
					break;
				} else{
					renewIds[i].validity = PART_NOT_IN_USE;
				}
			}
		}
	} else {
		io_id_found = true;
	}

	productId.validity = PART_OK;
	DiscardInvalidChar(product_id_string, valid_id, MAX_ID_LENGTH - 2);
	if (valid_id != productId.id) {
		productId.validity = PART_NOT_IN_USE;
		for (int i = 0; i < renewIds.size(); i++) {
			if (renewIds[i].id_type == PRODUCT_INDEX) {
				if (renewIds[i].id == valid_id && renewIds[i].validity == PART_OK) {
					product_id_found = true;
					break;
				} else{
					renewIds[i].validity = PART_NOT_IN_USE;
				}
			}
		}
	} else {
		product_id_found = true;
	}

	std::vector<std::string> string_for_encoding;
	std::vector<camera_info> cam_info;
	long previous_cam_count = 0;
	for (int i = 0; i < camera_ids.size(); i++) {
		bool camera_found = false;
		int new_cam_index = -1;
		for (int j = 0; j < camera_ids.size(); j++) {
			DiscardInvalidChar(camera_ids[j].second, valid_id, MAX_ID_LENGTH - 4);
			if (cameraInfos[i].camera_id == valid_id && cameraInfos[i].validity_id == PART_OK) {
				camera_found = true;
				new_cam_index = j;
				break;
			}
		}
		if (!camera_found) {
			cam_info.push_back(camera_info(PART_NOT_IN_USE, cameraInfos[i].station_id, cameraInfos[i].camera_id));
		}
		else {
			cam_info.push_back(camera_info(PART_OK, camera_ids[new_cam_index].first, cameraInfos[i].camera_id));
			previous_cam_count++;
		}
	}
	for (int i = 0; i < renewIds.size(); i++) {
		if (renewIds[i].id_type == CAM_INDEX) {
			bool camera_found = false;
			int ref_id = 0;
			for (int j = 0; j < camera_ids.size(); j++) {
				DiscardInvalidChar(camera_ids[j].second, valid_id, MAX_ID_LENGTH - 4);
				if (renewIds[i].id == valid_id && renewIds[i].validity == PART_OK) {
					ref_id = j;
					camera_found = true;
					break;
				}
			}
			if (!camera_found) {
				renewIds[i].validity = PART_NOT_IN_USE;
			} else {
				renewIds[i].validity = PART_OK;
				renewIds[i].station_id = camera_ids[ref_id].first;
				previous_cam_count++;
			}
		}
	}

	bool new_camera_added = false;
	if (camera_ids.size() - previous_cam_count > 0) {
		new_camera_added = true;
	}

	PrepareStringForEncoding(invoice_id, po_id, machine_id, hddId, guId, ioId,
		cam_info, productId, string_for_encoding, first_gen_date_time);
	FindNumbers(string_for_encoding);
	GetColors(color_hex_value1, color_hex_value2, qr_code_string);

	if (hdd_id_found && gu_id_found && io_id_found && product_id_found && !new_camera_added && renewIds.size() <= 0) {
// 		return GetQRImage(qr_code_string);
	}
	else {

string_for_encoding.clear();
for (int i = 0; i < renewIds.size(); i++) {
    std::string valid_id;
    std::string id = renewIds[i].id;
    if (renewIds[i].id_type == CAM_INDEX){
        id.insert(id.begin(), std::to_string(renewIds[i].station_id)[0]);
        id.insert(id.begin(), std::to_string(machine_id)[0]);
    }
    GetValidSerialId2(renewIds[i].validity, renewIds[i].id_type, id, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);
    GetValidSerialId(renewIds[i].date, valid_id, MAX_ID_LENGTH);
    string_for_encoding.push_back(valid_id);
}
std::string dummy_id(MAX_ID_LENGTH, '~');


		long new_addition_size = (long)renewIds.size() * 2;
		long total_ids = new_addition_size + (new_addition_size % 2);
		for (int i = 0; i < total_ids - new_addition_size; i++) {
			string_for_encoding.push_back(dummy_id);
		}
		FindNumbers(string_for_encoding, true);
		//GetColors(color_hex_value1, color_hex_value2, qr_code_string);

		std::vector<camera_info> new_cam_info;
		for (int i = 0; i < camera_ids.size(); i++) {
			bool camera_found = false;
			DiscardInvalidChar(camera_ids[i].second, valid_id, MAX_ID_LENGTH - 4);
			for (int j = 0; j < cameraInfos.size(); j++) {
				if (cameraInfos[j].camera_id == valid_id && cameraInfos[j].validity_id == PART_OK) {
					camera_found = true;
					break;
				}
			}
			for (int j = 0; j < renewIds.size(); j++) {
				if (renewIds[j].id_type == CAM_INDEX) {
					if (renewIds[j].id == valid_id && renewIds[j].validity == PART_OK) {
						camera_found = true;
						break;
					}
				}
			}
			if (!camera_found) {
				new_cam_info.push_back(camera_info(PART_OK, camera_ids[i].first, camera_ids[i].second));
			}
		}

		part_id _hddId, __gu_id, _ioId, __product_id;
		_hddId.validity = hdd_id_found ? PART_NOT_IN_USE : PART_OK;
		_hddId.id = hdd_id_string;
		__gu_id.validity = gu_id_found ? PART_NOT_IN_USE : PART_OK;
		__gu_id.id = gu_id_string;
		_ioId.validity = io_id_found ? PART_NOT_IN_USE : PART_OK;
		_ioId.id = io_id_string;
		__product_id.validity = product_id_found ? PART_NOT_IN_USE : PART_OK;
		__product_id.id = product_id_string;
		std::vector<std::string> string_to_append;
		PrepareAppendStringForEncoding(machine_id, _hddId, __gu_id, _ioId, 
			new_cam_info, __product_id, string_to_append);
		FindNumbers(string_to_append, true);
		GetColors(color_hex_value1, color_hex_value2, qr_code_string);
// 		if (!GetQRImage(qr_code_string)) {
// 			return GetLicense(_invoice_id, _po_id, machine_id, hdd_id, gu_id, io_id, camera_ids, product_id, color_hex_value1, color_hex_value2, qr_code_string, date_time);
// 		} else {
			return true;
// 		}
	}

	return false;
}



bool GetLicense(std::string &invoice_id, std::string &po_id, long machine_id, std::string &hdd_id, std::string &gu_id, std::string &io_id,
	std::vector<std::pair<long, std::string>> &camera_ids, std::string &product_id,
	std::vector<std::string> &color_hex_value1, std::vector<std::string> &color_hex_value2,
	 std::string &qr_code_string, const std::string &date_time) {

	if (hdd_id.length() <= 0 || gu_id.length() <= 0 || io_id.length() <= 0 || camera_ids.size() <= 0 || product_id.size() <= 0) {
		return false;
	}

	long max_lenght_of_camera = 0;

	SortCameraId(camera_ids);

	std::vector<std::string> string_for_encoding;
	std::vector<camera_info> cam_info;
	for (int i = 0; i < camera_ids.size(); i++) {
		cam_info.push_back(camera_info(PART_OK, camera_ids[i].first, camera_ids[i].second));
	}

	part_id hddId, _gu_id, ioId, _product_id;
	hddId.id = hdd_id;
	_gu_id.id = gu_id;
	ioId.id = io_id;
	_product_id.id = product_id;
	PrepareStringForEncoding(invoice_id, po_id, machine_id, hddId, _gu_id, ioId, cam_info, _product_id, string_for_encoding, date_time);
	FindNumbers(string_for_encoding);

	GetColors(color_hex_value1, color_hex_value2, qr_code_string);
return true;
// 	return GetQRImage(qr_code_string);
}

bool ValidateLicense(std::string &qr_code_string, std::string &invoice_id, std::string &po_id,
	long machine_id, std::string &hdd_id, std::string &gu_id, std::string &io_id,
	std::vector<std::pair<long, std::string>> &camera_ids, std::string &product_id,
	std::string &error_string, bool hdd_id_check, bool gu_id_check, bool io_id_check, bool camera_id_check, bool product_id_check) {

	if (hdd_id.length() <= 0 || gu_id.length() <= 0 || io_id.length() <= 0 || camera_ids.size() <= 0 || product_id.size() <= 0 || qr_code_string.length() <= 0) {
		return false;
	}

	long _machine_id;
	std::string _first_gen_date_time, _invoice_id, _po_id;
	part_id hddId, _gu_id, ioId, _product_id;
	std::vector<camera_info> _camera_ids;
	std::vector<part_renew_id> renewIds;
	std::vector<std::string> _color_hex_value1, _color_hex_value2;

	RetriveInfoFromQR(qr_code_string, _first_gen_date_time, _invoice_id, _po_id, _machine_id, hddId, _gu_id, ioId, _product_id,
		_camera_ids, renewIds, _color_hex_value1, _color_hex_value2);

// 	temp_qr_code_image.release();

	bool result = true;
	error_string.clear();
	error_string.append("LICENSE EXPIRED DUE TO\n");
	if (!StringMatching(_invoice_id, invoice_id)) {
		result = false;
		error_string.append("INVOICE NUMBER CHANGED\n");
	}
	if (!StringMatching(_po_id, po_id)) {
		result = false;
		error_string.append("PO NUMBER CHANGED\n");
	}
	if (_machine_id != machine_id) {
		result = false;
		error_string.append("MACHINE ID CHANGED\n");
	}

	if (hdd_id_check) {
		if (!StringMatching(hddId.id, hdd_id) || hddId.validity == PART_NOT_IN_USE) {
			bool id_matched = false;
			for (int i = 0; i < renewIds.size(); i++) {
				if (renewIds[i].id_type == HDD_INDEX && StringMatching(renewIds[i].id, hdd_id) && renewIds[i].validity == PART_OK) {
					id_matched = true;
				}
			}
			result = id_matched ? result : false;
			if (!id_matched) {
				error_string.append("HDD NUMBER CHANGED\n");
			}
		}
	}

	if (gu_id_check) {
		if (!StringMatching(_gu_id.id, gu_id) || _gu_id.validity == PART_NOT_IN_USE) {
			bool id_matched = false;
			for (int i = 0; i < renewIds.size(); i++) {
				if (renewIds[i].id_type == GU_INDEX && StringMatching(renewIds[i].id, gu_id) && renewIds[i].validity == PART_OK) {
					id_matched = true;
				}
			}
			result = id_matched ? result : false;
			if (!id_matched) {
				error_string.append("GUID NUMBER CHANGED\n");
			}
		}
	}

	if (io_id_check) {
		if (!StringMatching(ioId.id, io_id) || ioId.validity == PART_NOT_IN_USE) {
			bool id_matched = false;
			for (int i = 0; i < renewIds.size(); i++) {
				if (renewIds[i].id_type == IO_INDEX && StringMatching(renewIds[i].id, io_id) && renewIds[i].validity == PART_OK) {
					id_matched = true;
				}
			}
			result = id_matched ? result : false;
			if (!id_matched) {
				error_string.append("I/O SERIAL NUMBER CHANGED\n");
			}
		}
	}

	if (product_id_check){
		if (!StringMatching(_product_id.id, product_id) || _product_id.validity == PART_NOT_IN_USE) {
			bool id_matched = false;
			for (int i = 0; i < renewIds.size(); i++) {
				if (renewIds[i].id_type == PRODUCT_INDEX && StringMatching(renewIds[i].id, product_id) && renewIds[i].validity == PART_OK) {
					id_matched = true;
				}
			}
			result = id_matched ? result : false;
			if (!id_matched) {
				error_string.append("PRODUCT SELECTION CHANGED\n");
			}
		}
	}


	if (camera_id_check) {
		bool all_id_matched = true;
		if (camera_ids.size() <= 0) {
			result = false;
			error_string.append("NO CAMERA PRESENT\n");
		}
		for (int i = 0; i < camera_ids.size(); i++) {
			bool id_matched = false;
			//printf("CAMERA ID %s\n", camera_ids[i].second);
			for (int j = 0; j < _camera_ids.size(); j++) {
				//printf("LIC ID %s\n", _camera_ids[j].camera_id);
				if (_camera_ids[j].validity_id == PART_OK) {
					if (StringMatching(_camera_ids[j].camera_id, camera_ids[i].second) && _camera_ids[j].station_id == camera_ids[i].first) {
						id_matched = true;
					}
				}
			}
			if (!id_matched){
				for (int j = 0; j < renewIds.size(); j++) {
					//printf("LICRENEW ID %s\n", renewIds[j].id);
					if (renewIds[j].id_type == CAM_INDEX && renewIds[j].validity == PART_OK) {
						if (StringMatching(renewIds[j].id, camera_ids[i].second) && renewIds[j].station_id == camera_ids[i].first) {
							id_matched = true;
						}
					}
				}
			}
			all_id_matched = (!id_matched || !all_id_matched) ? false : true;
		}

		if (!all_id_matched) {
			result = false;
			error_string.append("CAMERA SERIAL NUMBER OR STATION INDEX NOT MATCHING\n");
		}
	}

	if (result) {
		error_string.clear();
	}
	return result;
}


// std::string getDataFromQr(std::string string1) {

//     std::string qr_string;
//     std::string first_gen_date_time;
//     std::string invoice_id;
//     std::string po_id;
//     long machine_id;
//     part_id hdd_id;
//     part_id gu_id;
//     part_id io_id;
//     part_id product_id;
//     std::vector<camera_info> camera_ids;
//     std::vector<part_renew_id> renew_ids;
//     std::vector<std::string> color_hex_value1, color_hex_value2;

//     qr_string = string1;

//     Initialize();
//     bool RenewLicense(std::string &qr_string, long machine_id, std::string &hdd_id, std::string &gu_id, std::string &io_id,
// 		std::vector<std::pair<long, std::string>> &camera_ids, std::string &product_id,
// 		std::vector<std::string> &color_hex_value1, std::vector<std::string> &color_hex_value2,
// 		 std::string &qr_code_string, const std::string &date_time = "");

// 	bool GetLicense(std::string &invoice_id, std::string &po_id, long machine_id, std::string &hdd_id, std::string &gu_id, std::string &io_id,
// 		std::vector<std::pair<long, std::string>> &camera_ids, std::string &product_id,
// 		std::vector<std::string> &color_hex_value1, std::vector<std::string> &color_hex_value2,
// 		 std::string &qr_code_string, const std::string &date_time = "");



// 	bool ValidateLicense(std::string &qr_code_string, std::string &invoice_id, std::string &po_id, long machine_id, std::string &hdd_id, std::string &gu_id, std::string &io_id,
// 		std::vector<std::pair<long, std::string>> &camera_ids, std::string &product_id, std::string &error_string,
// 		bool hdd_id_check = true, bool gu_id_check = true, bool io_id_check = true, bool camera_id_check = true, bool product_id_check = true);


//     std::string result = RetriveInfoFromQR(qr_string, first_gen_date_time, invoice_id, po_id,
//                                            machine_id, hdd_id, gu_id, io_id,
//                                            product_id, camera_ids, renew_ids,
//                                            color_hex_value1, color_hex_value2);

//     std::string lic_info = "";
//     std::string cameraProduct = "";
//     lic_info.append("PRIMARY INFORMATION");
//     lic_info.append("\nDATE : " + first_gen_date_time);
//     lic_info.append("\nMACHINE : " + GetMachineName(machine_id));
//     lic_info.append("\nHDD : " + std::to_string(hdd_id.validity) + " " + hdd_id.id);
//     lic_info.append("\nGU : " + std::to_string(gu_id.validity) + " " + gu_id.id);
//     lic_info.append("\nIO : " + std::to_string(io_id.validity) + " " + io_id.id);
//     lic_info.append("\nPRODUCT : " + std::to_string(product_id.validity) + " " + product_id.id);

//     lic_info.append("\nPRODUCT NO : "
//                     + getProductNumber(product_id.id));
//     std::string final_key = "";
//     for (int i = 0; i < color_hex_value2.size(); i++) {
//         final_key += std::string(color_hex_value2.at(i).c_str());
//         if (i < color_hex_value2.size() - 1) {
//             final_key += " - ";
//         }
//     }
//     lic_info.append(
//             "\nKey : " + final_key);
//     lic_info.append(result);
//     for (int i = 0; i < camera_ids.size(); i++) {
//         lic_info.append("\nCAMERA : " + std::to_string(camera_ids[i].validity_id) + " " +
//                         std::to_string(camera_ids[i].station_id) + " " + camera_ids[i].camera_id);
//     }

//     std::string product_code = "";
//     if (product_id.validity == PART_OK) {
//         product_code = product_id.id;
//     }


//     if (renew_ids.size() > 0) {
//         //User $!$ for split secondary information

//         lic_info.append("\n\nSECONDARY INFORMATION");
//         for (int i = 0; i < renew_ids.size(); i++) {
//             if (renew_ids[i].id_type == HDD_INDEX) {
//                 lic_info.append(
//                         "\nHDD : " + std::to_string(renew_ids[i].validity) + " " + renew_ids[i].id +
//                         " " + renew_ids[i].date);
//             } else if (renew_ids[i].id_type == GU_INDEX) {
//                 lic_info.append(
//                         "\nGU : " + std::to_string(renew_ids[i].validity) + " " + renew_ids[i].id +
//                         " " + renew_ids[i].date);
//             } else if (renew_ids[i].id_type == IO_INDEX) {
//                 lic_info.append(
//                         "\nIO : " + std::to_string(renew_ids[i].validity) + " " + renew_ids[i].id +
//                         " " + renew_ids[i].date);
//             } else if (renew_ids[i].id_type == PRODUCT_INDEX) {
//                 lic_info.append("\nPRODUCT : " + std::to_string(renew_ids[i].validity) + " " +
//                                 renew_ids[i].id + " " + renew_ids[i].date);
//                 if (renew_ids[i].validity == PART_OK) {
//                     product_code = renew_ids[i].id;
//                 }
//                 lic_info.append("\nPRODUCT NO : " + renew_ids[i].date + "$"
//                                 + getProductNumber(renew_ids[i].id));
//             } else if (renew_ids[i].id_type == CAM_INDEX) {
//                 lic_info.append("\nCAMERA : " + std::to_string(renew_ids[i].validity) + " " +
//                                 std::to_string(renew_ids[i].station_id) + " " + renew_ids[i].id +
//                                 " " + renew_ids[i].date);
//             }
//         }
//     }

//     printf("%s", lic_info.c_str());

//     return lic_info;

// }


json getDataFromQr(std::string string1) {
    std::string qr_string;
    std::string first_gen_date_time;
    std::string invoice_id;
    std::string po_id;
    long machine_id;
    part_id hdd_id;
    part_id gu_id;
    part_id io_id;
    part_id product_id;
    std::vector<camera_info> camera_ids;
    std::vector<part_renew_id> renew_ids;
    std::vector<std::string> color_hex_value1, color_hex_value2;

    qr_string = string1;

    Initialize();

    std::string result = RetriveInfoFromQR(qr_string, first_gen_date_time, invoice_id, po_id, machine_id, hdd_id, gu_id, io_id, product_id, camera_ids, renew_ids, color_hex_value1, color_hex_value2);

    json lic_info;
    lic_info["PRIMARY INFORMATION"]["DATE"] = first_gen_date_time;
    lic_info["PRIMARY INFORMATION"]["MACHINE"] = GetMachineName(machine_id);
    lic_info["PRIMARY INFORMATION"]["HDD"] = { {"validity", hdd_id.validity}, {"id", hdd_id.id} };
    lic_info["PRIMARY INFORMATION"]["GU"] = { {"validity", gu_id.validity}, {"id", gu_id.id} };
    lic_info["PRIMARY INFORMATION"]["INVOICE"] = invoice_id;
    lic_info["PRIMARY INFORMATION"]["PO_ID"] = po_id;
    lic_info["PRIMARY INFORMATION"]["IO"] = { {"validity", io_id.validity}, {"id", io_id.id} };
    lic_info["PRIMARY INFORMATION"]["PRODUCT"] = { {"validity", product_id.validity}, {"id", product_id.id} };
    lic_info["PRIMARY INFORMATION"]["PRODUCT NO"] = getProductNumber(product_id.id);

    std::string final_key;
    for (const auto& color : color_hex_value2) {
        if (!final_key.empty()) {
            final_key += " - ";
        }
        final_key += color;
    }
    lic_info["PRIMARY INFORMATION"]["Key"] = final_key;

    for (const auto& camera : camera_ids) {
        json camera_info;
        camera_info["validity_id"] = camera.validity_id;
        camera_info["station_id"] = camera.station_id;
        camera_info["camera_id"] = camera.camera_id;
        lic_info["PRIMARY INFORMATION"]["CAMERAS"].push_back(camera_info);
    }

    if (!renew_ids.empty()) {
        lic_info["SECONDARY INFORMATION"] = json::array();
        for (const auto& renew_id : renew_ids) {
            json renew_info;
            if (renew_id.id_type == HDD_INDEX) {
                renew_info["HDD"] = { {"validity", renew_id.validity}, {"id", renew_id.id}, {"date", renew_id.date} };
            } else if (renew_id.id_type == GU_INDEX) {
                renew_info["GU"] = { {"validity", renew_id.validity}, {"id", renew_id.id}, {"date", renew_id.date} };
            } else if (renew_id.id_type == IO_INDEX) {
                renew_info["IO"] = { {"validity", renew_id.validity}, {"id", renew_id.id}, {"date", renew_id.date} };
            } else if (renew_id.id_type == PRODUCT_INDEX) {
                renew_info["PRODUCT"] = { {"validity", renew_id.validity}, {"id", renew_id.id}, {"date", renew_id.date} };
                if (renew_id.validity == PART_OK) {
                    lic_info["PRIMARY INFORMATION"]["PRODUCT NO"] = getProductNumber(renew_id.id);
                }
            } else if (renew_id.id_type == CAM_INDEX) {
                renew_info["CAMERA"] = { {"validity", renew_id.validity}, {"station_id", renew_id.station_id}, {"id", renew_id.id}, {"date", renew_id.date} };
            }
            lic_info["SECONDARY INFORMATION"].push_back(renew_info);
        }
    }

    return lic_info;
}

// extern "C" JNIEXPORT jstring JNICALL
// Java_com_span_app_MyNativeModule_processQRCode(JNIEnv* env, jobject /* this */, jstring qrData) {
//     const char* qrDataCStr = env->GetStringUTFChars(qrData, nullptr);
//     if (qrDataCStr == nullptr) {
//         return env->NewStringUTF("Error: QR data is null");
//     }
//     std::string qrDataStr(qrDataCStr);
//     std::string result = getDataFromQr(qrDataStr);
//     env->ReleaseStringUTFChars(qrData, qrDataCStr);
//     return env->NewStringUTF(result.c_str());
// }


// extern "C" JNIEXPORT jstring JNICALL
// Java_com_span_app_MyNativeModule_processQRCode(JNIEnv* env, jobject /* this */, jstring qrData) {
//     const char* qrDataCStr = env->GetStringUTFChars(qrData, nullptr);
//     if (qrDataCStr == nullptr) {
//         return env->NewStringUTF("Error: QR data is null");
//     }
//     std::string qrDataStr(qrDataCStr);
//     json result = getDataFromQr(qrDataStr);
//     env->ReleaseStringUTFChars(qrData, qrDataCStr);

//     std::string resultStr = result.dump(); // Convert JSON object to string
//     return env->NewStringUTF(resultStr.c_str()); // Return JSON string as jstring
// }

// const char* getHelloWorld() {
//     return "Hello, world!";
// }


// json getDataFromQr(const std::string& qrDataStr) {
//     json result;
//     result["data"] = qrDataStr;  // This should be your actual processing logic
//     result["status"] = "processed";
//     return result;
// }

extern "C" const char* processQRCode(const char* qrData) {
    if (qrData == nullptr) {
        return "Error: QR data is null";
    }
    std::string qrDataStr(qrData);
    json result = getDataFromQr(qrDataStr);

    std::string resultStr = result.dump(); // Convert JSON object to string
    char* resultCStr = new char[resultStr.length() + 1];
    std::strcpy(resultCStr, resultStr.c_str());
    return resultCStr;
}