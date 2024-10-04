#import "MyNativeModule.h"
#import <React/RCTLog.h>
#import "YourProject-Bridging-Header.h"

@implementation MyNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(processQRCode:(NSString *)qrData resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    const char* qrDataCStr = [qrData UTF8String];
    const char* resultCStr = processQRCode(qrDataCStr);

    if (resultCStr != nullptr) {
        NSString* resultStr = [NSString stringWithUTF8String:resultCStr];
        delete[] resultCStr; // Don't forget to free the allocated memory
        resolve(resultStr);
    } else {
        reject(@"qr_error", @"QR processing failed", nil);
    }
}

@end
