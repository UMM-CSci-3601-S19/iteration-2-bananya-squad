package umm3601.vehicles;

import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;


public class VehicleController {

  private final MongoCollection<Document> vehicleCollection;

  public VehicleController(MongoDatabase database) {
    vehicleCollection = database.getCollection("Vehicles");
  }

  String addNewVehicle() {

    Document newVehicle = new Document();


    try {
      vehicleCollection.insertOne(newVehicle);

      ObjectId _id = newVehicle.getObjectId("_id");

      System.err.println("Successfully added new vehicle [_id=" + _id + ']');
      return _id.toHexString();

    } catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }

}
