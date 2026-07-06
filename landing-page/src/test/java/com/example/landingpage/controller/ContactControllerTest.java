package com.example.landingpage.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for ContactController using MockMvc to simulate HTTP requests.
 */
@WebMvcTest(ContactController.class)
public class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    /**
     * Test GET / endpoint.
     * Verifies that the endpoint returns status 200 OK and resolves to the "index" template view.
     */
    @Test
    public void testGetIndex() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"));
    }

    /**
     * Test POST /contact endpoint.
     * Verifies that submitting form parameters triggers 200 OK and responds with the successful submission text.
     */
    @Test
    public void testPostContact() throws Exception {
        mockMvc.perform(post("/contact")
                        .param("name", "Jane Doe")
                        .param("email", "jane.doe@example.com")
                        .param("message", "Hello, this is a test message."))
                .andExpect(status().isOk())
                .andExpect(content().string("Form submitted successfully!"));
    }
}
