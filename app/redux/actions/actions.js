import firebase from "firebase";
import { USER_FETCH_DATA } from "../constants/index";
import { USER_FETCH_GROUP_DATA_EVENTS } from "../constants/index";
import { USER_FETCH_GROUP_DATA_USERS } from "../constants/index";
import { USER_FETCH_GROUP_DATA_LISTINGS } from "../constants/index";
import {auth} from '../../screens/firebase/firebase'
export function fetchUser()
{
    return ((dispatch) => {
        firebase.firestore().collection("users").doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists){
                dispatch({type : USER_FETCH_DATA, currentUser: snapshot.data()})
            }
            else{
                console.log("does not exist")
            }
        })
    })
}

export function fetchGroupEvents(group)
{
    return ((dispatch) => {
        firebase.firestore().collection("groups").doc(group).collection("events")
        .get()
        .then((docs) => {
        let eventsArray = []
        docs.forEach((snapshot) => {
          eventsArray.push(snapshot.data())
        });
        dispatch({type : USER_FETCH_GROUP_DATA_EVENTS, events: eventsArray})
      });
    })
}

export function fetchGroupUsers(group)
{
    return((dispatch) => {
    firebase
      .firestore()
      .collection("groups")
      .doc(group)
      .collection("users")
      .get()
      .then((docs) => {
        let usernamesArray = []
        docs.forEach((snapshot) => {
            usernamesArray.push(snapshot.data())
        });
        dispatch({type : USER_FETCH_GROUP_DATA_USERS, usersG: usernamesArray});
      });
    })
}

export function fetchGroupListings(group)
{
    return((dispatch) => {
    firebase
      .firestore()
      .collection("groups")
      .doc(group)
      .collection("listings")
      .get()
      .then((docs) => {
        let usernamesArray = []
        docs.forEach((snapshot) => {
            usernamesArray.push(snapshot.data())
            console.log(snapshot.data())
        });
        dispatch({type : USER_FETCH_GROUP_DATA_LISTINGS, listings: usernamesArray});
      });
    })
}