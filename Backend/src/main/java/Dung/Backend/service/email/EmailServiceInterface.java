package Dung.Backend.service.email;

public interface EmailServiceInterface {
    public void sendMessage(String from, String to, String subject, String text);
}
