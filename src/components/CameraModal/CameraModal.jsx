import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import { useSharedVariables } from "../ShareableStates/ShareableState";
import Webcam from "react-webcam";
import Axios from "axios";
import { Spin } from "antd";

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

  const checkHealth = async () => {
    await Axios.get(
      `${process.env.REACT_APP_ENNOVENTURE_BASE_URL}/internal/health`
    )
      .then((response) => {
        sysHealthGood = response.data.msg === "OK" ? true : false;
        // console.log("1-health", response);
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
        // console.log("2-login", response);
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
        // console.log("3-experience", response);
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
        // console.log("4-session", response);
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
        // console.log("5-upload", response);
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
        // console.log("6-update", response);
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
        // console.log("7-result", response);
        final_result = response.data.result;
        status = response.data.status;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const startSystem = async () => {
    try {
      //   console.log("!!!!!!!!!!--------System started---------!!!!!!!!!!");
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
                  //   console.log("One second has passed");
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

    // Now you have the file in the desired format
    // console.log("File:", file);
  });

  const getPhoto = (e) => {
    let formData = new FormData();
    formData.append("input_image", e.target.files[0]);
    form_data = e.target.files[0];
  };

  const stopWebcam = () => {
    videoConstraint = false;
  };

  const handleCancel = () => {
    setOpen(false);
    setSession(false);
  };
  const handleOk = async () => {
    setResultModal(true);
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
    setImage("");
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
        width={600}
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
                  type="primary"
                  onClick={
                    !resultModal
                      ? handleOk
                      : () => {
                          setOpen(false);
                          setResultModal(false);
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
              <div>
                <button
                  onClick={() => {
                    setSession(true);
                  }}
                >
                  Upload using Webcam
                </button>
                <div>
                  <input type="file" onChange={getPhoto} />
                </div>
              </div>
            ) : (
              <div className="webcam-container">
                <div className="webcam-img">
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
                    <img src={image} />
                  )}
                </div>
                <div>
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
              <div>
                <Spin size="large" />
                <h1>Processing...</h1>
              </div>
            ) : (
              <div>
                <h1>Result</h1>
                <p>{productResult}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
export default CameraModal;