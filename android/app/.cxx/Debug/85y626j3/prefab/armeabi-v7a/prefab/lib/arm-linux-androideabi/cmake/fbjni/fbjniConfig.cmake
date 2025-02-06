if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "C:/Users/User/.gradle/caches/8.10.2/transforms/28fdbe0fd38be51c70aa15cbfdb48b6d/transformed/jetified-fbjni-0.6.0/prefab/modules/fbjni/libs/android.armeabi-v7a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/User/.gradle/caches/8.10.2/transforms/28fdbe0fd38be51c70aa15cbfdb48b6d/transformed/jetified-fbjni-0.6.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

