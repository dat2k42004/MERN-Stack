import React from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function PosterModal({ open, onClose, imageUrl }) {
     if (!imageUrl) return null;

     return (
          <Modal
               open={open}
               onCancel={onClose}
               footer={null}
               width={600}
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
               bodyStyle={{
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
               }}
          >
               <img
                    src={imageUrl}
                    alt="Poster"
                    style={{
                         maxWidth: "100%",
                         maxHeight: "80vh",
                         objectFit: "contain",
                    }}
               />
          </Modal>
     );
}

export default PosterModal;
