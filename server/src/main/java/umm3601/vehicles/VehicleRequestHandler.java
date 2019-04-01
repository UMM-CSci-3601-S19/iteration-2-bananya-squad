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


  public String addNewVehicle(Request req, Response res) {
    res.type("application/json");

    Document newVehicle = Document.parse(req.body());

    String ownerId = newVehicle.getString("ownerId");
    Integer year = newVehicle.getInteger("year");
    String model = newVehicle.getString("model");
    String color = newVehicle.getString("color");
    String condition = newVehicle.getString("condition");
    String engine= newVehicle.getString("engine");
    Integer weight = newVehicle.getInteger("weight");
    Integer mpg = newVehicle.getInteger("mpg");
    Boolean ledLights = newVehicle.getBoolean("ledLights");

    System.err.println("Adding new ride [ownerId=" + ownerId + " year=" + year + " model=" + model + " color=" + color + " condition=" + condition
      + " engine=" + engine + " weight=" + weight + " mpg=" + mpg + " ledLights=" + ledLights + ']');

    return vehicleController.addNewVehicle(ownerId, year, model, color, condition, engine, weight, mpg, ledLights);
  }

}
