package umm3601.user;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoException;
import org.bson.types.ObjectId;
import org.bson.Document;

import java.util.Iterator;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


import static com.mongodb.client.model.Filters.eq;

public class UserController {

  private final MongoCollection<Document> userCollection;

  public UserController(MongoDatabase database) {
    userCollection = database.getCollection("Users");
  }

  String getUsers(Map<String, String[]> queryParams) {

    Document filterDoc = new Document();

    if (queryParams.containsKey("name")) {
      String targetContent = (queryParams.get("name")[0]);
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetContent);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("name", contentRegQuery);
    }

    FindIterable<Document> matchingUser = userCollection.find(filterDoc);

    return serializeIterable(matchingUser);
  }

  public String addNewUser(String userId, String email, String fullName, String pictureUrl, String lastName, String firstName) {

    FindIterable<Document> matchingUsers = userCollection.find(eq("userId", new ObjectId(userId)));

    Iterator<Document> iterator = matchingUsers.iterator();

    if (iterator.hasNext()) {

      Document userInfo1 = iterator.next();
      return userInfo1.toJson();

    } else {
      ObjectId id = new ObjectId();

      Document newUser = new Document();
      newUser.append("_id", id);
      newUser.append("userId", userId);
      newUser.append("email", email);
      newUser.append("fullName", fullName);
      newUser.append("pictureUrl", pictureUrl);
      newUser.append("lastName", lastName);
      newUser.append("firstName", firstName);

      try {
        userCollection.insertOne(newUser);
        System.err.println("Successfully added new user [_id=" + id + " userId " + userId + " email " + email + " fullName " + fullName + " pictureUrl "
        + pictureUrl + " lastName " + lastName + " firstName " + firstName);

        Document userInfo2 = new Document();
        userInfo2.append("userId", matchingUsers.first().get("userId"));
        userInfo2.append("email", matchingUsers.first().get("email"));
        userInfo2.append("fullName", matchingUsers.first().get("fullName"));
        userInfo2.append("pictureUrl", matchingUsers.first().get("pictureUrl"));
        userInfo2.append("lastName", matchingUsers.first().get("lastName"));
        userInfo2.append("firstName", matchingUsers.first().get("firstName"));

        return userInfo2.toJson();

      } catch(MongoException e) {
        e.printStackTrace();
        return null;
      }
    }
  }

  /*String getRide(String id) {
    FindIterable<Document> jsonRides = rideCollection.find(eq("_id", new ObjectId(id)));

    Iterator<Document> iterator = jsonRides.iterator();
    if (iterator.hasNext()) {
      Document ride = iterator.next();
      return ride.toJson();
    } else {
      // We didn't find the desired ride
      return null;
    }
  }*/



  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }
}
