package umm3601.user;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
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

  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }
}
