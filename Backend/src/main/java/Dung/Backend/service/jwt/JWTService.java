package Dung.Backend.service.jwt;

import Dung.Backend.entity.Role;
import Dung.Backend.entity.User;
import Dung.Backend.entity.UserProfile;
import Dung.Backend.service.account.UserSecurityServiceImpl;
import Dung.Backend.service.user.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class JWTService {
    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    @Autowired
    private UserSecurityServiceImpl userSecurityServiceImpl;


    //create JWT based on username
    public String generateToken(String email){
        Map<String, Object> claims = new HashMap<>();
        User user = userSecurityServiceImpl.findByEmail(email);

        boolean isAdmin = false;
        boolean isStaff = false;
        boolean isUser = false;

        if(user != null && user.getListRole().size()>0){
            List<Role> list = user.getListRole();
            for (Role r:list){
                if(r.getRoleName().equals("ADMIN")){
                    isAdmin = true;
                }
                if(r.getRoleName().equals("STAFF")){
                    isStaff = true;
                }
                if(r.getRoleName().equals("USER")){
                    isUser = true;
                }
            }
        }

        claims.put("isAdmin", isAdmin);
        claims.put("isStaff", isStaff);
        claims.put("isUser", isUser);
        return createTokenWithSelectedClaims(claims, email);
    }

    //create JWT with selected claims
    private String createTokenWithSelectedClaims(Map<String, Object> claims, String email) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+6*60*60*1000))//JWT lasts for 30 mins
                .signWith(SignatureAlgorithm.HS256,getSignKey())
                .compact();
    }

    //get secret key
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //extract info
    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }
    //Extract specific information to a claim
    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction){
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    //check expiration of JWT
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    //extract email
    public String extractEmail(String token){
        return extractClaim(token, Claims::getSubject);
    }

    //Check expired JWT
    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    //check for validity
    public Boolean validateToken(String token, UserDetails userDetails){
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername())&& isTokenExpired(token));
    }


}
