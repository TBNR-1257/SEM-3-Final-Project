import React from "react";
import { PrettyChatWindow } from "react-chat-engine-pretty";

export default function ChatsPage(props) {
  return (
    <div className="background">
      <PrettyChatWindow
        projectId="
        590aa84c-1619-4997-a31d-2bfbb74de424"
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
