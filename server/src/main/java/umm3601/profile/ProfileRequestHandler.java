package umm3601.profile;

import org.bson.Document;
import spark.Request;
import spark.Response;

public class ProfileRequestHandler {

  private final ProfileController profileController;

  public ProfileRequestHandler(ProfileController profileController) {
    this.profileController = profileController;
  }

  public String getProfile(Request req, Response res) {
    res.type("application/json");
    return profileController.getProfile(req.queryMap().toMap());
  }

}
