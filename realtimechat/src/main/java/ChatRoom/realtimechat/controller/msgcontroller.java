package ChatRoom.realtimechat.controller;

import ChatRoom.realtimechat.model.message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class msgcontroller {

    @MessageMapping("/message")//for sending message
    @SendTo("/topic/return-to")//who subscibe this link they recieve message
    public message getcontent(@RequestBody message m) {
        try {
//            processsing
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return m;
    }
}
