package umm3601.vehicles;

import org.bson.Document;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;

import java.text.DateFormatSymbols;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


public class VehicleRequestHandler{

  private final VehicleController vehicleController;

  public VehicleRequestHandler(VehicleController vehicleController) {
    this.vehicleController = vehicleController;
  }

  public String getVehicles(Request req, Response res) {
    res.type("application/json");
    return vehicleController.getVehicles(req.queryMap().toMap());
  }



  public String addNewVehicle(Request req, Response res) {
    res.type("application/json");
    Document newVehicle = Document.parse(req.body());
    String ownerId = newVehicle.getString("ownerId");
    String model = newVehicle.getString("model");
    String color = newVehicle.getString("color");
    String engine= newVehicle.getString("engine");
    String mpg = newVehicle.getString("mpg");
    Boolean ecoFriendly = newVehicle.getBoolean("ecoFriendly");

    System.err.println("Adding new vehicle [ownerId=" + ownerId + " model=" + model + " color=" + color
      + " engine=" + engine + " mpg=" + mpg + " ecoFriendly=" + ecoFriendly + ']');

    return vehicleController.addNewVehicle(ownerId, model, color, engine, mpg, ecoFriendly);
  }

}
