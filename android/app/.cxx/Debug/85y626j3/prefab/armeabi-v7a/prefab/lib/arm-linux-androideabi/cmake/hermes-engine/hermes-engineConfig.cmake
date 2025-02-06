if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/User/.gradle/caches/8.10.2/transforms/5d4b14d1e08b8a0b02c75cb9caa10fc6/transformed/jetified-hermes-android-0.76.5-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/User/.gradle/caches/8.10.2/transforms/5d4b14d1e08b8a0b02c75cb9caa10fc6/transformed/jetified-hermes-android-0.76.5-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

