import React, { useState, useEffect } from "react";
import { createexam } from "../actions/examActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { CREATE_EXAM_RESET } from "../constants/examConstants";

const CreateExam = ({ history, match }) => {
  const applicationId = match.params.id;
  const [email, setEmail] = useState("");

  //repetitio;
  const [repetition, setRepetition] = useState("");
  const [hesitation, setHesitation] = useState("");
  const [selfCorrection, setSelfCorrection] = useState("");
  const [linking, setLinking] = useState("");
  const [express, setExpress] = useState("");

  const [wideRange, setWideRange] = useState("");
  const [idiomatic, setIdiomatic] = useState("");
  const [flexible, setFlexible] = useState("");
  const [paraphrases, setParaphrases] = useState("");

  const [basicSentences, setBasicSentences] = useState("");
  const [complex, setComplex] = useState("");
  const [error, setErrors] = useState("");
  const [comperehension, setComprehension] = useState("");

  const [mispronunciations, setMispronunciations] = useState("");
  const [effortLess, setEffortLess] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createExam = useSelector((state) => state.createExam);
  const { loading, error: errorCreate, exam, success } = createExam;

  const total =
    Number(repetition) +
    Number(hesitation) +
    Number(selfCorrection) +
    Number(linking) +
    Number(express);
  const fluandcoh = Number(total / 5).toFixed(1);

  const total2 =
    Number(wideRange) +
    Number(idiomatic) +
    Number(flexible) +
    Number(paraphrases);
  const lexires = Number(total2 / 4).toFixed(1);

  const total3 =
    Number(basicSentences) +
    Number(complex) +
    Number(error) +
    Number(comperehension);
  const gramandaccu = Number(total3 / 4).toFixed(1);

  const total4 = Number(mispronunciations) + Number(effortLess);
  const pronun = Number(total4 / 2).toFixed(1);

  const grandtotal =
    Number(fluandcoh) + Number(lexires) + Number(gramandaccu) + Number(pronun);

  const finaltotal = Number(grandtotal / 4);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo && (userInfo.role !== 2) | userInfo && userInfo.role !== 1) {
        history.push(`/dashboard/${userInfo._id}`);
      }
    }
    if (success) {
      toast.success(exam.message);
      history.push(`/admin/speakingassesment/${applicationId}`);
      dispatch({ type: CREATE_EXAM_RESET });
    }
    if (errorCreate) {
      toast.error(errorCreate);
      dispatch({ type: CREATE_EXAM_RESET });
    }
  }, [
    userInfo,
    history,
    finaltotal,
    success,
    exam,
    errorCreate,
    dispatch,
    applicationId,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter Student Name");
    }
    if (!applicationId) {
      toast.error("Please enter Application ID");
    } else if (!repetition) {
      toast.error("Please select repetition!");
    } else if (!hesitation) {
      toast.error("Please select Hesitation, pauses");
    } else if (!selfCorrection) {
      toast.error("Please select Self correction");
    } else if (!linking) {
      toast.error("Please select Linking words and discourse Markers");
    } else if (!express) {
      toast.error(
        "Please select Express and justify opinions, Topics developed logically"
      );
    } else if (!wideRange) {
      toast.error("Please select Wide range of Vocabulary");
    } else if (!idiomatic) {
      toast.error("Please select Idiomatic vocabulary expressions");
    } else if (!flexible) {
      toast.error("Please select Flexible use of vocabulary");
    } else if (!paraphrases) {
      toast.error("Please select Paraphrases effectively");
    } else if (!basicSentences) {
      toast.error("Please select  Basic Sentences");
    } else if (!complex) {
      toast.error("Please select Complex structures");
    } else if (!error) {
      toast.error("Please select Errors(not accuracy)");
    } else if (!comperehension) {
      toast.error("Please select Comperehension problem");
    } else if (!mispronunciations) {
      toast.error("Please select Mispronunciations");
    } else if (!effortLess) {
      toast.error("Please select Is it effortless to understand");
    } else {
      dispatch(
        createexam({
          applicationId,
          email,
          fluandcoh,
          lexires,
          gramandaccu,
          pronun,
          finaltotal,
          examType: "private",
        })
      );
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Container>
        <Row>
          <Col md={12}>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <Form style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <h4>Basic Information</h4>
                  </Col>
                  <Col md={6}>
                    <FormControl
                      className="mt-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Student Email"
                    />
                  </Col>
                  <Col md={12}>
                    <h2 className="mt-5">Final Score: {finaltotal} </h2>
                  </Col>
                  <Col md={12}>
                    <h4 className="mt-3">
                      Fluency and coherence (Score: {fluandcoh})
                    </h4>
                    <hr />
                    <h5>Repetition</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="2"
                          onChange={(e) => setRepetition(e.target.value)}
                          label="always"
                          name="Repetition"
                          id="Repetition1"
                        />
                        <Form.Check
                          value="3"
                          onChange={(e) => setRepetition(e.target.value)}
                          type="radio"
                          label="frequent"
                          name="Repetition"
                          id="Repetition2"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setRepetition(e.target.value)}
                          type="radio"
                          label="for keep going "
                          name="Repetition"
                          id="Repetition3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="5"
                          onChange={(e) => setRepetition(e.target.value)}
                          type="radio"
                          label="occasional "
                          name="Repetition"
                          id="Repetition4"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setRepetition(e.target.value)}
                          type="radio"
                          label="at times"
                          name="Repetition"
                          id="Repetition5"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setRepetition(e.target.value)}
                          type="radio"
                          label="very few "
                          name="Repetition"
                          id="Repetition6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="8"
                          onChange={(e) => setRepetition(e.target.value)}
                          type="radio"
                          label="rare"
                          name="Repetition"
                          id="Repetition7"
                        />
                      </Col>
                    </Row>
                    <h5 className="mt-2">Hesitation, pauses</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="2"
                          onChange={(e) => setHesitation(e.target.value)}
                          label="always lengthily"
                          name="Hesitation"
                          id="Hesitation1"
                        />
                        <Form.Check
                          value="3"
                          onChange={(e) => setHesitation(e.target.value)}
                          type="radio"
                          label="long"
                          name="Hesitation"
                          id="Hesitation2"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setHesitation(e.target.value)}
                          type="radio"
                          label="noticeable ＆ speak slowly "
                          name="Hesitation"
                          id="Hesitation3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="5"
                          onChange={(e) => setHesitation(e.target.value)}
                          type="radio"
                          label="slow for keep going "
                          name="Hesitation"
                          id="Hesitation4"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setHesitation(e.target.value)}
                          type="radio"
                          label="occasional "
                          name="Hesitation"
                          id="Hesitation5"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setHesitation(e.target.value)}
                          type="radio"
                          label="some"
                          name="Hesitation"
                          id="Hesitation6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="7"
                          onChange={(e) => setHesitation(e.target.value)}
                          type="radio"
                          label="usually content-related "
                          name="Hesitation"
                          id="Hesitation7"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setHesitation(e.target.value)}
                          type="radio"
                          label="all content related"
                          name="Hesitation"
                          id="Hesitation8"
                        />
                      </Col>
                    </Row>
                    <h5 className="mt-2">Self correction</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          value="3"
                          onChange={(e) => setSelfCorrection(e.target.value)}
                          type="radio"
                          label="always"
                          name="Selfcorrection"
                          id="Selfcorrection1"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setSelfCorrection(e.target.value)}
                          type="radio"
                          label="for keep going"
                          name="Selfcorrection"
                          id="Selfcorrection2"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setSelfCorrection(e.target.value)}
                          type="radio"
                          label="occasional"
                          name="Selfcorrection"
                          id="Selfcorrection3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="6"
                          onChange={(e) => setSelfCorrection(e.target.value)}
                          type="radio"
                          label="some"
                          name="Selfcorrection"
                          id="Selfcorrection4"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setSelfCorrection(e.target.value)}
                          type="radio"
                          label="very few"
                          name="Selfcorrection"
                          id="Selfcorrection5"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setSelfCorrection(e.target.value)}
                          type="radio"
                          label="rare"
                          name="Selfcorrection"
                          id="Selfcorrection6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="8"
                          onChange={(e) => setSelfCorrection(e.target.value)}
                          type="radio"
                          label="rare"
                          name="Selfcorrection"
                          id="Selfcorrection7"
                        />
                      </Col>
                    </Row>
                    <h5 className="mt-2">
                      Linking words and discourse Markers
                    </h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          value="1"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="none"
                          name="Linking"
                          id="Linking1"
                        />
                        <Form.Check
                          value="2"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="limited simple sentences"
                          name="Linking"
                          id="Linking2"
                        />
                        <Form.Check
                          value="3"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="links basic sentences ＆ repetitious simple connectives"
                          name="Linking"
                          id="Linking3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="4"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="over-use certain connectives ＆ discourse markers"
                          name="Linking"
                          id="Linking4"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="range but wrong"
                          name="Linking"
                          id="Linking5"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="range"
                          name="Linking"
                          id="Linking6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="7"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="coherently and appropriately"
                          name="Linking"
                          id="Linking7"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setLinking(e.target.value)}
                          type="radio"
                          label="coherently with fully appropriate"
                          name="Linking"
                          id="Linking8"
                        />
                      </Col>
                    </Row>
                    <h5 className="mt-2">
                      Express and justify opinions, Topics developed logically
                    </h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          value="2"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="little communication possible"
                          name="Expressandjustify"
                          id="Expressandjustify1"
                        />
                        <Form.Check
                          value="3"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="only simple responses ＆ frequently cannot basic message"
                          name="Expressandjustify"
                          id="Expressandjustify2"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="some breakdowns in coherence"
                          name="Expressandjustify"
                          id="Expressandjustify3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="5"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="usually flow＆ simple fluently＆ more complex communication"
                          name="Expressandjustify"
                          id="Expressandjustify4"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="willing at length＆ lose coherence sometimes"
                          name="Expressandjustify"
                          id="Expressandjustify5"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="at length without noticeable effort or loss coherence"
                          name="Expressandjustify"
                          id="Expressandjustify6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="8"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="coherently and appropriately"
                          name="Expressandjustify"
                          id="Expressandjustify7"
                        />
                        <Form.Check
                          value="9"
                          onChange={(e) => setExpress(e.target.value)}
                          type="radio"
                          label="fully and appropriately"
                          name="Expressandjustify"
                          id="Expressandjustify8"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <hr className="mt-5" />
                  <Col md={12}>
                    <h4>Lexical Resource(Score: {lexires})</h4>
                    <hr />
                    <h5>Wide range of Vocabulary</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="2"
                          onChange={(e) => setWideRange(e.target.value)}
                          label="isolated or memorised utterances "
                          name="WideRange"
                          id="WideRange1"
                        />
                        <Form.Check
                          value="3"
                          onChange={(e) => setWideRange(e.target.value)}
                          type="radio"
                          label="simple＆ insufficient less familiar topics"
                          name="WideRange"
                          id="WideRange2"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setWideRange(e.target.value)}
                          type="radio"
                          label="familiar topics＆ only basic meaning unfamiliar topics "
                          name="WideRange"
                          id="WideRange3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="5"
                          onChange={(e) => setWideRange(e.target.value)}
                          type="radio"
                          label="manages all topics "
                          name="WideRange"
                          id="WideRange4"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setWideRange(e.target.value)}
                          type="radio"
                          label="wide enough all topics at length"
                          name="WideRange"
                          id="WideRange5"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setWideRange(e.target.value)}
                          type="radio"
                          label="some less common"
                          name="WideRange"
                          id="WideRange6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="8"
                          onChange={(e) => setWideRange(e.target.value)}
                          type="radio"
                          label="wide resource ＆less common"
                          name="WideRange"
                          id="WideRange7"
                        />
                        <Form.Check
                          value="9"
                          onChange={(e) => setWideRange(e.target.value)}
                          type="radio"
                          label="well in all topics"
                          name="WideRange"
                          id="WideRange8"
                        />
                      </Col>
                    </Row>
                    <h5>Idiomatic vocabulary expressions</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="4"
                          onChange={(e) => setIdiomatic(e.target.value)}
                          label="none"
                          name="Idiomatic"
                          id="Idiomatic1"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setIdiomatic(e.target.value)}
                          type="radio"
                          label="some awareness style ＆ collocation some inappropriate choices "
                          name="Idiomatic"
                          id="Idiomatic2"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setIdiomatic(e.target.value)}
                          type="radio"
                          label="skilfully_occasional inaccuracies"
                          name="Idiomatic"
                          id="Idiomatic3"
                        />
                        <Form.Check
                          value="9"
                          onChange={(e) => setIdiomatic(e.target.value)}
                          type="radio"
                          label="naturally and accurately"
                          name="Idiomatic"
                          id="Idiomatic4"
                        />
                      </Col>
                    </Row>
                    <h5>Flexible use of vocabulary</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="3"
                          onChange={(e) => setFlexible(e.target.value)}
                          label="little"
                          name="Flexible"
                          id="Flexible1"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setFlexible(e.target.value)}
                          type="radio"
                          label="frequent errors word choice"
                          name="Flexible"
                          id="Flexible2"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setFlexible(e.target.value)}
                          type="radio"
                          label="limited"
                          name="Flexible"
                          id="Flexible3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="6"
                          onChange={(e) => setFlexible(e.target.value)}
                          type="radio"
                          label="meaning clear but inappropriate"
                          name="Flexible"
                          id="Flexible4"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setFlexible(e.target.value)}
                          type="radio"
                          label="flexibly variety topics"
                          name="Flexible"
                          id="Flexible5"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setFlexible(e.target.value)}
                          type="radio"
                          label="readily and flexibly precise meaning"
                          name="Flexible"
                          id="Flexible6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="9"
                          onChange={(e) => setFlexible(e.target.value)}
                          type="radio"
                          label="full all topics"
                          name="Flexible"
                          id="Flexible7"
                        />
                      </Col>
                    </Row>
                    <h5>Paraphrases effectively</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="3"
                          onChange={(e) => setParaphrases(e.target.value)}
                          label="little"
                          name="Paraphrases"
                          id="Paraphrases1"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setParaphrases(e.target.value)}
                          type="radio"
                          label="errors are frequent "
                          name="Paraphrases"
                          id="Paraphrases2"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setParaphrases(e.target.value)}
                          type="radio"
                          label="attempts to use but with mixed success"
                          name="Paraphrases"
                          id="Paraphrases3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="6"
                          onChange={(e) => setParaphrases(e.target.value)}
                          type="radio"
                          label="generally successful"
                          name="Paraphrases"
                          id="Paraphrases4"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setParaphrases(e.target.value)}
                          type="radio"
                          label="effectively"
                          name="Paraphrases"
                          id="Paraphrases5"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setParaphrases(e.target.value)}
                          type="radio"
                          label="effectively as required"
                          name="Paraphrases"
                          id="Paraphrases6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="9"
                          onChange={(e) => setParaphrases(e.target.value)}
                          type="radio"
                          label="full all topics"
                          name="Paraphrases"
                          id="Paraphrases7"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <hr className="mt-5" />
                    <h4>Grammar range and accuracy(Score: {gramandaccu})</h4>
                    <hr />
                    <h5>Basic Sentences</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="1"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          label="cannot"
                          name="BasicSentences"
                          id="BasicSentences1"
                        />
                        <Form.Check
                          value="2"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="attempts limited success or memorized"
                          name="BasicSentences"
                          id="BasicSentences2"
                        />
                        <Form.Check
                          value="3"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="produces basic and simple sentences forms but errors are frequent "
                          name="BasicSentences"
                          id="BasicSentences3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="4"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="basic sentences, frequent error exept in memorized expressions"
                          name="BasicSentences"
                          id="BasicSentences4"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="produces basic sentences, limited range of complex structure "
                          name="BasicSentences"
                          id="BasicSentences5"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="mix simple and complex limited flexibility"
                          name="BasicSentences"
                          id="BasicSentences6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="7"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="a range of complex structure and some grammatical mistakes"
                          name="BasicSentences"
                          id="BasicSentences7"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="wide range of structure with very occasional inappropriacies"
                          name="BasicSentences"
                          id="BasicSentences8"
                        />
                        <Form.Check
                          value="9"
                          onChange={(e) => setBasicSentences(e.target.value)}
                          type="radio"
                          label="perfect"
                          name="BasicSentences"
                          id="BasicSentences9"
                        />
                      </Col>
                    </Row>
                    <h5>Complex structures</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="3"
                          onChange={(e) => setComplex(e.target.value)}
                          label="none"
                          name="Complex"
                          id="Complex1"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setComplex(e.target.value)}
                          type="radio"
                          label="rare subordinate"
                          name="Complex"
                          id="Complex2"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setComplex(e.target.value)}
                          type="radio"
                          label="limited range"
                          name="Complex"
                          id="Complex3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="6"
                          onChange={(e) => setComplex(e.target.value)}
                          type="radio"
                          label="mix of simple and complex structures ＆ limited flexibility"
                          name="Complex"
                          id="Complex4"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setComplex(e.target.value)}
                          type="radio"
                          label="range ＆ some flexibility"
                          name="Complex"
                          id="Complex5"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setComplex(e.target.value)}
                          type="radio"
                          label="wide range＆ flexibly"
                          name="Complex"
                          id="Complex6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="9"
                          onChange={(e) => setComplex(e.target.value)}
                          type="radio"
                          label="usually content related"
                          name="Complex"
                          id="Complex7"
                        />
                      </Col>
                    </Row>
                    <h5>Errors(not accuracy)</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="3"
                          onChange={(e) => setErrors(e.target.value)}
                          label="Numerous except in memorized"
                          name="Errors"
                          id="Errors1"
                        />
                        <Form.Check
                          value="4"
                          onChange={(e) => setErrors(e.target.value)}
                          type="radio"
                          label="Frequent"
                          name="Errors"
                          id="Errors2"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setErrors(e.target.value)}
                          type="radio"
                          label="Reasonable accuracy basic sentences ＆ complex structures usually"
                          name="Errors"
                          id="Errors3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="6"
                          onChange={(e) => setErrors(e.target.value)}
                          type="radio"
                          label="Frequent complex structures"
                          name="Errors"
                          id="Errors4"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setErrors(e.target.value)}
                          type="radio"
                          label="Frequently exactly sentences_some grammatical mistakes"
                          name="Errors"
                          id="Errors5"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setErrors(e.target.value)}
                          type="radio"
                          label="Majority exactly sentences_very occasional inappropriacy"
                          name="Errors"
                          id="Errors6"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="9"
                          onChange={(e) => setErrors(e.target.value)}
                          type="radio"
                          label="Consistently accurate structures"
                          name="Errors"
                          id="Errors7"
                        />
                      </Col>
                    </Row>
                    <h5>Comperehension problem</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="5"
                          onChange={(e) => setComprehension(e.target.value)}
                          label="always"
                          name="Comprehension"
                          id="Comprehension1"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setComprehension(e.target.value)}
                          type="radio"
                          label="misunderstanding"
                          name="Comprehension"
                          id="Comprehension2"
                        />
                        <Form.Check
                          value="7"
                          onChange={(e) => setComprehension(e.target.value)}
                          type="radio"
                          label="some"
                          name="Comprehension"
                          id="Comprehension3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="8"
                          onChange={(e) => setComprehension(e.target.value)}
                          type="radio"
                          label="rarely"
                          name="Comprehension"
                          id="Comprehension4"
                        />
                        <Form.Check
                          value="9"
                          onChange={(e) => setComprehension(e.target.value)}
                          type="radio"
                          label="none"
                          name="Comprehension"
                          id="Comprehension5"
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col md={12}>
                    <hr className="mt-5" />
                    <h4>Pronunciation(Score: {pronun})</h4>
                    <hr />
                    <h5>Mispronunciations</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="4"
                          onChange={(e) => setMispronunciations(e.target.value)}
                          label="often unintelligible"
                          name="Mispronunciations"
                          id="Mispronunciations1"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setMispronunciations(e.target.value)}
                          type="radio"
                          label="frequent, difficult at times for the listener "
                          name="Mispronunciations"
                          id="Mispronunciations2"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setMispronunciations(e.target.value)}
                          type="radio"
                          label="can generally be understood but mispronounces individual words that reduces"
                          name="Mispronunciations"
                          id="Mispronunciations3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="7"
                          onChange={(e) => setMispronunciations(e.target.value)}
                          type="radio"
                          label="individual, sometimes"
                          name="Mispronunciations"
                          id="Mispronunciations4"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setMispronunciations(e.target.value)}
                          type="radio"
                          label="minimal"
                          name="Mispronunciations"
                          id="Mispronunciations5"
                        />
                        <Form.Check
                          value="9"
                          onChange={(e) => setMispronunciations(e.target.value)}
                          type="radio"
                          label="none"
                          name="Mispronunciations"
                          id="Mispronunciations6"
                        />
                      </Col>
                    </Row>
                    <h5>
                      if can use pronunciation features with precision and
                      subtlety
                    </h5>
                    <Row>
                      <Col md={4}>
                        <Form.Check
                          type="radio"
                          value="4"
                          onChange={(e) => setEffortLess(e.target.value)}
                          label="often unintelligible"
                          name="EffortLess"
                          id="EffortLess1"
                        />
                        <Form.Check
                          value="5"
                          onChange={(e) => setEffortLess(e.target.value)}
                          type="radio"
                          label="attempts lapses are frequent"
                          name="EffortLess"
                          id="EffortLess2"
                        />
                        <Form.Check
                          value="6"
                          onChange={(e) => setEffortLess(e.target.value)}
                          type="radio"
                          label="some effective use of pronunciation features but not sustained"
                          name="EffortLess"
                          id="EffortLess3"
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Check
                          value="7"
                          onChange={(e) => setEffortLess(e.target.value)}
                          type="radio"
                          label="some effective use of pronunciation features and sustained"
                          name="EffortLess"
                          id="EffortLess4"
                        />
                        <Form.Check
                          value="8"
                          onChange={(e) => setEffortLess(e.target.value)}
                          type="radio"
                          label="L1 accent is minimal effect and only occasional lapses"
                          name="EffortLess"
                          id="EffortLess5"
                        />
                        <Form.Check
                          value="9"
                          onChange={(e) => setEffortLess(e.target.value)}
                          type="radio"
                          label="sustains throughout"
                          name="EffortLess"
                          id="EffortLess6"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <hr className="mt-5" />
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateExam;
