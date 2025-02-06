if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/User/.gradle/caches/8.10.2/transforms/6af72f2377ec71dcd9d2b5c9651fe3b9/transformed/jetified-hermes-android-0.76.5-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/User/.gradle/caches/8.10.2/transforms/6af72f2377ec71dcd9d2b5c9651fe3b9/transformed/jetified-hermes-android-0.76.5-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

