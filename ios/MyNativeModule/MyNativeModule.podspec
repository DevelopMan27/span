Pod::Spec.new do |s|
  s.name         = "MyNativeModule"
  s.version      = "0.1.0"
  s.summary      = "My Native Module for React Native"
  s.description  = <<-DESC
                   My Native Module for processing QR codes in React Native.
                   DESC
  s.homepage     = "https://example.com"
  s.license      = "MIT"
  s.author       = { "Your Name" => "your.email@example.com" }
  s.source       = { :git => "https://github.com/your/repo.git", :tag => "#{s.version}" }
  s.platform     = :ios, "10.0"
  s.source_files  = "*.{h,mm,cpp}"

  s.dependency 'React-Core'
end
