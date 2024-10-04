# cmake_minimum_required(VERSION 3.4.1)

# add_library(
#     MyNativeModule
#     SHARED
#     MyNativeModule.cpp
# )

# find_library(
#     log-lib
#     log
# )

# target_link_libraries(
#     MyNativeModule
#     ${log-lib}
# )
cmake_minimum_required(VERSION 3.10)

# Set the project name
project(MyNativeModule)

# Add the nlohmann_json library
include(FetchContent)
FetchContent_Declare(
    json
    GIT_REPOSITORY https://github.com/nlohmann/json.git
    GIT_TAG v3.11.3
)
FetchContent_MakeAvailable(json)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 17)

# Add the native library
add_library(MyNativeModule SHARED MyNativeModule.cpp)

# Link the nlohmann_json library to your native library
target_link_libraries(MyNativeModule PRIVATE nlohmann_json::nlohmann_json)

# Include directories
include_directories(${CMAKE_SOURCE_DIR})
