package umm3601.vehicles;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoException;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;
import org.bson.Document;

import java.util.Iterator;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.mongodb.client.model.Filters.eq;


public class VehicleController {

  private final MongoCollection<Document> vehicleCollection;

  public VehicleController(MongoDatabase database) {
    vehicleCollection = database.getCollection("Vehicles");
  }


  String getVehicles(Map<String, String[]> queryParams){

    Document filterDoc = new Document();

    if(queryParams.containsKey("ownerId")) {
      String targetContent = (queryParams.get("ownerId")[0]);
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetContent);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("ownerId", contentRegQuery);
    }

    FindIterable<Document> matchingVehicle = vehicleCollection.find(filterDoc);

    return serializeIterable(matchingVehicle);
  }

  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }

  String addNewVehicle(String ownerId, String model, String color,
                       String engine, String mpg, Boolean ecoFriendly) {

    Document newVehicle = new Document();
    newVehicle.append("ownerId", ownerId);
    newVehicle.append("model", model);
    newVehicle.append("color", color);
    newVehicle.append("engine", engine);
    newVehicle.append("mpg", mpg);
    newVehicle.append("ecoFriendly", ecoFriendly);


    try {
      vehicleCollection.insertOne(newVehicle);

      ObjectId _id = newVehicle.getObjectId("_id");

      System.err.println("Successfully added new vehicle [_id=" + _id + ']' + ", model=" + model + ", color=" + color
        + ", engine" + engine + ", mpg=" + mpg + ", ecoFriendly=" + ecoFriendly + ".");
      return _id.toHexString();

    } catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }



}
