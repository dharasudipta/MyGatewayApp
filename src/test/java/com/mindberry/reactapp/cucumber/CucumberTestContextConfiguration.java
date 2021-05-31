package com.mindberry.reactapp.cucumber;

import com.mindberry.reactapp.MyGatewayApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = MyGatewayApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
