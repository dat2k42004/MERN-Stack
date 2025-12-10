import React from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function TrailerModal({ open, onClose, videoId }) {
     if (!videoId) return null;

     return (
          <Modal
               open={open}
               onCancel={onClose}
               footer={null}
               width={800}
               centered
               closable={true}
               closeIcon={
                    <CloseOutlined
                         style={{
                              fontSize: "20px",
                              color: "#fff",
                              backgroundColor: "#000",
                              borderRadius: "50%",
                              padding: "4px",
                              position: "absolute",
                              top: "-20px",
                              right: "-20px",
                              zIndex: 9999,
                         }}
                    />
               }
               bodyStyle={{ padding: 0, position: "relative" }}
          >
               <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <iframe
                         src={`https://www.youtube.com/embed/${videoId}`}
                         title="Trailer"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                         style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                         }}
                    ></iframe>
               </div>
          </Modal>
     );
}

export default TrailerModal;
