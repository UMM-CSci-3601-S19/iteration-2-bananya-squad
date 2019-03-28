package umm3601.user;

import org.bson.Document;
import spark.Request;
import spark.Response;

public class UserRequestHandler {

  private final UserController userController;

  public UserRequestHandler(UserController userController) {
    this.userController = userController;
  }

  public String getUsers(Request req, Response res) {
    res.type("application/json");
    return userController.getUsers(req.queryMap().toMap());
  }

}
