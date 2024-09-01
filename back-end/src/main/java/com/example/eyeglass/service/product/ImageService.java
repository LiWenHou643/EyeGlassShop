package com.example.eyeglass.service.product;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ImageService {
    Cloudinary cloudinary;

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