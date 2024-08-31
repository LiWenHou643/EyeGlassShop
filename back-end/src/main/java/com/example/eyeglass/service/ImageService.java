package com.example.eyeglass.service;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Map;

public class ImageService {
    private final Cloudinary cloudinary;

    public ImageService() {
        Dotenv dotenv = Dotenv.load();
        cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
        cloudinary.config.secure = true;
    }

    public String uploadImage(String image) {
        try {
            Map params1 = ObjectUtils.asMap(
                    "use_filename", true,
                    "unique_filename", false,
                    "overwrite", true
            );

            Map uploadResult = cloudinary.uploader().upload(image, params1);
            return (String) uploadResult.get("url");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}