import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import { useSharedVariables } from "../ShareableStates/ShareableState";
import Webcam from "react-webcam";
import Axios from "axios";
import { Spin } from "antd";
import "./CameraModal.scss";

const video_constraint = {
  width: 220,
  height: 200,
  facingMode: "user",
};
var sysHealthGood = false;
var access_token = "";
var product_config_id = "";
var session_id = "";
var task_id = "";
var final_result = "";
var form_data = null;
var status = null;

var videoConstraint = video_constraint;

const CameraModal = () => {
  const { open, setOpen } = useSharedVariables();
  const [image, setImage] = useState("");
  const [session, setSession] = useState(false);
  const { chatting } = useSharedVariables();
  const webcamRef = React.useRef(null);
  const [productResult, setProductResult] = useState(null);
  const [resultModal, setResultModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const checkHealth = async () => {
    await Axios.get(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/internal/health`
    )
      .then((response) => {
        sysHealthGood = response.data.msg === "OK" ? true : false;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = async () => {
    const reqBody = {
      api_key: `${process.env.REACT_APP_ENNOVENTURE_API_KEY}`,
    };
    await Axios.post(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/auth/login`,
      reqBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        access_token = response.data.access_token;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchExperience = async () => {
    const productScanId = `${process.env.REACT_APP_ENNO_PRODUCT_SCAN_ID}`;

    await Axios.get(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/fetch-experience`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          product_scan_id: productScanId,
        },
      }
    )
      .then((response) => {
        product_config_id = response.data.product_config_id;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const startSession = async () => {
    const reqBody = {
      product_config_id: parseInt(product_config_id),
      session_metadata: {},
      geo_location: {
        lat: 0,
        long: 0,
      },
    };
    await Axios.post(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/verify/start-session`,
      reqBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then((response) => {
        session_id = response.data.session_id;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const imageUpload = async () => {
    const requestBody = {
      input_image: form_data,
    };

    await Axios.post(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/verify/upload-image`,
      requestBody,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          session_id: session_id,
        },
      }
    )
      .then((response) => {
        task_id = response.data.task_id;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTaskMetaData = async () => {
    const reqBody = {
      latency_details: {
        user_click_delay: 1,
        canvas_draw_delay: 1,
        network_delay: 1,
      },
    };
    await Axios.post(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/verify/update-task-metadata`,
      reqBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          session_id: session_id,
          task_id: task_id,
        },
      }
    )
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verifySessionResult = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    await Axios.get(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/verify/session-result`,
      {
        headers: headers,
        params: {
          session_id: session_id,
        },
      }
    )
      .then((response) => {
        final_result = response.data.result;
        status = response.data.status;
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const startSystem = async () => {
    try {
      await checkHealth().then(async function () {
        if (sysHealthGood) {
          await login()
            .then(async function () {
              await fetchExperience();
            })
            .then(async function () {
              await startSession();
            })
            .then(async function () {
              await imageUpload();
            })
            .then(async function () {
              await updateTaskMetaData();
            })
            .then(async function () {
              while (status !== "COMPLETED") {
                await verifySessionResult();
                setTimeout(function () {
                }, 1000);
              }
            })
            .then(async function () {
              setProductResult(final_result);
            });
        } else {
          message.error("System is down at the moment.");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const capture = React.useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
    const base64String = screenshot.replace(
      /^data:image\/(png|jpeg);base64,/,
      ""
    );
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "image/jpeg" });
    const file = new File([blob], "screenshot.jpg", { type: "image/jpeg" });
    form_data = file;
  });

  const getPhoto = (e) => {
    let formData = new FormData();
    setSelectedImage(e.target.files[0]);
    message.success("Image selected!")
    formData.append("input_image", e.target.files[0]);
    form_data = e.target.files[0];
    setImage("");
  };

  const stopWebcam = () => {
    videoConstraint = false;
  };

  const handleCancel = () => {
    setOpen(false);
    setSession(false);
    setResultModal(false);
    setProductResult(null);
    sysHealthGood = false;
      access_token = "";
      product_config_id = "";
      session_id = "";
      task_id = "";
      final_result = "";
      form_data = null;
      setImageUrl(null);
      setSelectedImage(null);
      status = null;
      setImage("");
  };
  const handleOk = async () => {
    if (form_data) {
      setResultModal(true);
      setProductResult(null);
      await startSystem();
      setSession(false);
      sysHealthGood = false;
      access_token = "";
      product_config_id = "";
      session_id = "";
      task_id = "";
      final_result = "";
      form_data = null;
      status = null;
    } else {
      message.warning("Please choose or click a product photo!");
    }
  };

  const startCamera = () => {
    videoConstraint = video_constraint;
  };

  return (
    <>
      <Modal
        title="AuthentiAI Product Verification System"
        centered
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={resultModal && !productResult ? false : true}
        maskClosable={false}
        width={resultModal?600:1000}
        footer={
          resultModal && !productResult
            ? null
            : [
                !resultModal && (
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>
                ),
                <Button
                  key="submit"
                  className="product-verify-submit"
                  onClick={
                    !resultModal
                      ? handleOk
                      : () => {
                          setOpen(false);
                          setResultModal(false);
                          setImage("");
                          setSession(false);
                          setImageUrl(null);
                          setSelectedImage(null);
                        }
                  }
                >
                  {resultModal && productResult ? "Ok" : "Submit"}
                </Button>,
              ]
        }
      >
        {!resultModal ? (
          <div>
            {!session ? (
              <div className="product-verify-buttons">
                <div className="product-verify-left">
                  <div
                    className="product-verify-webcam"
                    onClick={() => {
                      setSession(true);
                      setImageUrl(null);
                      setSelectedImage(null);
                    }}
                  >
                    Upload using Webcam
                  </div>
                  <div>
                    <div>
                      <div className="product-verify-select">
                      <label for="files">
                        <div className="webcam-label">Select Image</div>
                      </label>
                    </div>
                    {selectedImage && <p className="image-name">Image: {selectedImage.name}</p>}
                      <input
                        id="files"
                        className="product-verify-select"
                        type="file"
                        style={{ visibility: "hidden" }}
                        onChange={getPhoto}
                      />
                    </div>
                  </div>
                </div>
                <div>
                <img
              src="verify.jpg"
              class="verify-image"
              alt="User Profile"
            />
                </div>
              </div>
            ) : (
              <div className="webcam-container">
                <div className="webcam-img product-result-page">
                  {image === "" ? (
                    <Webcam
                      audio={false}
                      height={200}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={220}
                      videoConstraints={videoConstraint}
                    />
                  ) : (
                    <img src={image} width="220" style={{borderRadius:"5px"}}/>
                  )}
                </div>
                <div className="product-result-page">
                  {image != "" ? (
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        setImage("");
                      }}
                      className="webcam-btn"
                    >
                      Retake Image
                    </button>
                  ) : (
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        capture();
                        message.success("Image captured!")
                      }}
                      className="webcam-btn"
                    >
                      Capture
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {!productResult ? (
              <div style={{textAlign: "center"}}>
                <Spin size="large" style={{marginTop: "50px"}}/>
                <h3 style = {{margin: "20px 0px"}}>Processing..</h3>
              </div>
            ) : (
              <div className="product-result-page">
                <img src={(imageUrl && selectedImage)?imageUrl:image} width="200" alt="Product Image" style={{borderRadius:"5px"}} />
                <p style={{marginTop: "30px"}}>Identification: <b>{productResult}</b></p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
export default CameraModal;
