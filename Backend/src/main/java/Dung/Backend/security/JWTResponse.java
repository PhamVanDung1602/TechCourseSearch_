package Dung.Backend.security;

public class JWTResponse {
    private final String jwt;

    public JWTResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}
