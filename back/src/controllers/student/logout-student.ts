import { RequestHandler } from "express";

export const logoutStudentController: RequestHandler = async (req, res) => {
  try {
    // For JWT tokens, logout is typically handled on the client side
    // by simply removing the token from storage
    // If you need server-side logout, you would implement a token blacklist
    
    res.status(200).json({ 
      message: "Logout successful" 
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to logout" 
    });
  }
};
