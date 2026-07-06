package com.example.landingpage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller to handle requests for the landing page and the contact form submission.
 */
@Controller
public class ContactController {

    /**
     * Serves the home/landing page.
     * Maps to GET / and resolves to templates/index.html.
     */
    @GetMapping("/")
    public String index() {
        return "index";
    }

    /**
     * Handles the contact form submission.
     * Maps to POST /contact and processes form inputs.
     */
    @PostMapping("/contact")
    @ResponseBody
    public String submitContact(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("message") String message) {

        // Print the submitted data in the console in the requested format
        System.out.println("==============================");
        System.out.println("Contact Form Submitted");
        System.out.println();
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Message: " + message);
        System.out.println("==============================");

        // Return confirmation message
        return "Form submitted successfully!";
    }
}
