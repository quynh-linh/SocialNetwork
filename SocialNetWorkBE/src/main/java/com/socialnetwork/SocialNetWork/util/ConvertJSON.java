package com.socialnetwork.SocialNetWork.util;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
public class ConvertJSON {
    public static String converJsonToString (String text,String title){
        JsonObject jsonObject = JsonParser.parseString(text).getAsJsonObject();
        return jsonObject.get(title).getAsString();
    }
}
