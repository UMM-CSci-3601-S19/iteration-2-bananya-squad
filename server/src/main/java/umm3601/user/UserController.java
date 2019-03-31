package umm3601.user;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoException;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;
import org.bson.Document;


import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;



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

    Document filterDoc = new Document();

    Document contentRegQuery = new Document();
    contentRegQuery.append("$regex", userId);
    contentRegQuery.append("$options", "i");
    filterDoc = filterDoc.append("userId", contentRegQuery);

    FindIterable<Document> matchingUsers = userCollection.find(filterDoc);

    if(JSON.serialize(matchingUsers).equals("[ ]")){
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
        System.err.println("Successfully added new user [_id=" + id + ", userId=" + userId + " email=" + email + " fullName=" + fullName + " pictureUrl " + pictureUrl + " lastName " + lastName
          + " firstName " + firstName + "]");
        // return JSON.serialize(newUser);
        Document userInfo = new Document();
        userInfo.append("_id", matchingUsers.first().get("_id"));
        userInfo.append("email", matchingUsers.first().get("email"));
        userInfo.append("fullName", matchingUsers.first().get("fullName"));
        userInfo.append("pictureUrl", matchingUsers.first().get("pictureUrl"));
        userInfo.append("lastName", matchingUsers.first().get("lastName"));
        userInfo.append("firstName", matchingUsers.first().get("firstName"));

        return JSON.serialize(userInfo);

      } catch(MongoException me) {
        me.printStackTrace();
        return null;
      }

    } else {

      Document userInfo = new Document();
      userInfo.append("_id", matchingUsers.first().get("_id"));
      userInfo.append("email", matchingUsers.first().get("email"));
      userInfo.append("fullName", matchingUsers.first().get("fullName"));
      userInfo.append("pictureUrl", matchingUsers.first().get("pictureUrl"));
      userInfo.append("lastName", matchingUsers.first().get("lastName"));
      userInfo.append("firstName", matchingUsers.first().get("firstName"));

      return JSON.serialize(userInfo);
    }

  }


  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }
}
