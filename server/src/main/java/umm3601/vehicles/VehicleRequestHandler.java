package umm3601.vehicles;

import org.bson.Document;
import spark.Request;
import spark.Response;


public class VehicleRequestHandler{

  private final VehicleController vehicleController;

  public VehicleRequestHandler(VehicleController vehicleController) {
    this.vehicleController = vehicleController;
  }

  public String addNewVehicle(Request req, Response res) {
    res.type("application/json");

    return vehicleController.addNewVehicle();
  }

}
