package com.socialnetwork.SocialNetWork.util;

import java.util.Random;

public class SplitString {
    public static String splitStringToStartWithAndEndWith(String text) {
        if (text.startsWith("\"") && text.endsWith("\"")) {
            return text.substring(1, text.length() - 1);
        } else {
            return "";
        }
    }
}
