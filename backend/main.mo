import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

actor {
  type Shoe = {
    id : Text;
    name : Text;
    description : Text;
    category : Text;
    price : Nat;
    sizes : [Nat];
    colors : [Text];
    imageUrls : [Text];
  };

  module Shoe {
    public func compare(shoe1 : Shoe, shoe2 : Shoe) : Order.Order {
      Text.compare(shoe1.id, shoe2.id);
    };
  };

  let shoes = Map.empty<Text, Shoe>();

  public shared ({ caller }) func addShoe(id : Text, name : Text, description : Text, category : Text, price : Nat, sizes : [Nat], colors : [Text], imageUrls : [Text]) : async () {
    if (shoes.containsKey(id)) {
      Runtime.trap("Shoe with this ID already exists");
    };

    let shoe : Shoe = {
      id;
      name;
      description;
      category;
      price;
      sizes;
      colors;
      imageUrls;
    };

    shoes.add(id, shoe);
  };

  public query ({ caller }) func getShoe(id : Text) : async Shoe {
    switch (shoes.get(id)) {
      case (null) { Runtime.trap("Shoe not found") };
      case (?shoe) { shoe };
    };
  };

  public query ({ caller }) func getAllShoes() : async [Shoe] {
    shoes.values().toArray().sort();
  };

  public query ({ caller }) func filterByCategory(category : Text) : async [Shoe] {
    shoes.values().filter(
      func(shoe) { shoe.category == category }
    ).toArray().sort();
  };
};
