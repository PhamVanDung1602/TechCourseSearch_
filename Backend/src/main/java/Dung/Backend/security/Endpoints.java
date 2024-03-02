package Dung.Backend.security;

public class Endpoints {
    public static  final String FRONT_END_HOST = "http://localhost:3000";

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/account/register",
            "/account/login",
            "/account/logout",
            "/user-info/updateUserFullName",
            "/user-info/updateUserDetails"
    };

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "user/search/existsByEmail",
            "user/search/existsByUsername",
            "/account/activate",
            "/user-info/getUserInfo"
    };

    public static final String[] ADMIN_GET_ENDPOINTS = {
            "/user",
            "/user/**",
            "/user_profile",
            "/user_profile/**"
    };




}
