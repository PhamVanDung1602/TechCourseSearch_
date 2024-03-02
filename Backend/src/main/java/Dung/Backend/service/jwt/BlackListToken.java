package Dung.Backend.service.jwt;



import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
@Component
public class BlackListToken {
    private Set<String> blackListToken = new HashSet<>();

    public void addToBlackList(String token){
        blackListToken.add(token);
    }

    public boolean isTokenBlackListed(String token){
        return blackListToken.contains(token);
    }
}
