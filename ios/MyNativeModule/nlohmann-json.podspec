Pod::Spec.new do |s|
    s.name     = 'nlohmann-json'
    s.version  = '3.9.1'
    s.summary  = 'JSON for Modern C++'
    s.description = <<-DESC
      JSON for Modern C++.
    DESC
  
    s.homepage = 'https://github.com/nlohmann/json'
    s.license  = { :type => 'MIT', :file => 'LICENSE' }
    s.authors  = { 'Niels Lohmann' => 'mail@nlohmann.me' }
    s.source   = { :git => 'https://github.com/nlohmann/json.git', :tag => 'v3.9.1' }
  
    s.header_dir = 'nlohmann'
    s.source_files = '../nlohmann/single_include/nlohmann/json.hpp'
  end
  