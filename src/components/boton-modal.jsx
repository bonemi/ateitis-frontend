import React, { Fragment } from "react";
import Img from "gatsby-image";
import { Modal } from "react-bootstrap";

export default function BotonModal({
  data,
  nodeName,
  mostrarFooter = false,
  iconoEnBody = true,
}) {
  const titulo = data.node.title;
  const { color, subTitulo, texto, icono } = data.node[nodeName];
  const logo = icono.localFile.childImageSharp.fixed;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Fragment>
      <div
        onClick={() => {
          setModalShow(true);
        }}
        className={`boton-modal ${color ? "" : "secundario"} hvr-bob`}
      >
        <div className="image-container">
          <Img fixed={logo}></Img>
        </div>
        <div className="label">
          <div className="boton-modal-subtitulo">{subTitulo}</div>
          <div className="boton-modal-titulo">{titulo}</div>
        </div>
      </div>
      <ModalBotonModal
        // mostrarFooter={mostrarFooter}
        data={{
          titulo,
          color,
          subTitulo,
          texto,
          icono,
          logo,
          iconoEnBody,
          mostrarFooter,
        }}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      ></ModalBotonModal>
    </Fragment>
  );
}

function ModalBotonModal(props) {
  const {
    titulo,
    color,
    subTitulo,
    texto,
    icono,
    logo,
    iconoEnBody,
    mostrarFooter,
  } = props.data;
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {subTitulo} {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {iconoEnBody && (
          <div className="background">
            <Img fixed={logo}></Img>
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: texto }}></div>
      </Modal.Body>
      {mostrarFooter && (
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
          <Img fixed={logo}></Img>
        </Modal.Footer>
      )}
    </Modal>
  );
}
