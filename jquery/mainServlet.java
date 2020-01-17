package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.*;

public class mainServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		request.setCharacterEncoding("UTF-8");
		
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		BufferedReader br = request.getReader();
		JSONObject obj = (JSONObject)JSONValue.parse(br);
		String sign = (String) obj.get("sign");
		
		if(sign!=null){
			if(sign.equals("login")){
				String id=(String)obj.get("id");
				String pw=(String)obj.get("pw");
				
				obj=new JSONObject();
				
				boolean flag=true;
				
				if(flag){
					obj.put("resultCode",true);
					obj.put("message",id+"님 환영");
				}else{
					obj.put("resultCode",false);
					obj.put("message","다시 로그인");
				}				
			}
		}else{
			
		}
		out.print(obj);
		
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

}
