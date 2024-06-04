import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import founder from '../images/Founder1.png'
import background from '../images/founderbackground.jpg'
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'
import {Helmet} from "react-helmet";

const Founder = () => {
    return (
        <div style={{marginTop:'82px'}}>
             <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
              <Helmet>
                <meta charSet="utf-8" />
                <title>The Founder | Learn and Share Online English Education</title>
            </Helmet>
            <Container style={{backgroundImage: "url(" + background + ")",backgroundSize:'cover', backgroundRepeat:"no-repeat"}}>
                <Row style={{backgroundColor:"#113ac044"}}>
                    <Col md={8}>
                        <div className="card text-white bg-primary" style={{marginLeft:"20px",marginTop:'75px',padding:'20px 20px 20px 20px'}}>
                            <p>Hello! Welcome to LEARN AND SHARE ONLINE! My name is Joe, not my real name but students know and remember me with this name. I’m the founder of Learn and Share Online English Education which started to operate in 2018.</p>
                            <p>I am a graduate of Bachelor of Science in Secondary Education majoring in English and have been teaching since 2010.</p>
                            <p>Starting an institution for learning was something I could have never imagined. But thanks to the Almighty who has given me inspirations and motivations, Learn and Share Online English Education now fosters English speaker aspirants from China and Vietnam.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <Image src={founder} style={{margin:'50px 0px 0px 0px',height:'350px'}}/>
                    </Col>
                </Row>
                <Row style={{backgroundColor:"#113ac044"}}>
                    <Col md={12}>
                    <div className="card text-white bg-danger" style={{padding:'30px 30px 30px 30px'}}>
                        <h3>The following below are the general tips to improving your English communication skills.</h3>
                    </div>
                    </Col>
                    <Col md={12}>
                        <div class="list-group">
                            <div class="d-flex w-100 justify-content-between text-light bg-info mt-3 mb-3" >
                                <p style={{padding:'20px 20px 20px 20px'}}>1. Learn the basics. The basic is to learn the English Grammar rules. If you are a genius, maybe you can learn it by yourself. But ordinary people learn them from schools with the help of teachers or tutors, this is the best way to learn the English grammar.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div class="list-group">
                            <div class="d-flex w-100 justify-content-between text-light bg-info mb-3">
                                <p style={{padding:'20px 20px 20px 20px'}}>2. Improve your vocabularies. There are various interesting ways to heighten the level of your English vocabularies. Aside from reading articles, books, novels, magazines and other reading materials like this, you can also learn new words from English songs, videos or movies wth English subtitles. There are also fun word games that you can play with your mobile phones. Play the one that is most useful for you but you should not forget your main goal which is learning new vocabularies. I also advise you that you should use those learned new words in your daily life to retain them to your memory.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div class="list-group">
                            <div class="d-flex w-100 justify-content-between text-light bg-info mb-3">
                                <p style={{padding:'20px 20px 20px 20px'}}>3. Anything can be done with practice. Make sure you find time to review and practice pronunciation of words. You are ought to practice oral English with the grammar rules in mind.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div class="list-group">
                            <div class="d-flex w-100 justify-content-between text-light bg-info mb-3">
                                <p style={{padding:'20px 20px 20px 20px'}}>4. Find a speaking partner. This is the most essential tip. Don’t just pick anyone to practice your oral English, your partner must be a better English speaker than you who can help correct your mistakes. Learning from mistakes is sometimes bitter, but this is one of the most effective way. To help you find a capable speaking partner, visit OUR TEAM page.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div class="list-group">
                            <div class="d-flex w-100 justify-content-between text-light bg-info mb-3">
                                <p style={{padding:'20px 20px 20px 20px'}}>5. Broaden your English environment. Okay, let’s say you can now communicate in English with less problem. For every learner not to forget everything he/she has learned, there should be always application, and I think this is the most challenging one. In non-English speaking country, local people find it difficult because they have rare chances of talking in English. So one way you can broaden your English environment is through travelling and giving yourself a chance to international involvement. Being an international student for instance, or having a career which can provide you the opportunities to work in an international setting and travel abroad.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="bg-success text-white">
                    <Col md={12}>
                        <h4 className="text-white mt-3">The Most efficient way to study English Grammar</h4>
                        <p>The Most efficient way to study English Grammar</p>
                        <p>Before you start studying English grammar topics, make sure that you are familiar with the parts of speech and the parts of sentences. This means being able to identify nouns, verbs, adverbs, adjectives and so on, and to determine the object or the subject of the sentence.</p>
                        <p>Once you are comfortable with this part of grammar, you can focus on the specific grammar rules in the English language.</p>
                        <p>I would start with the present simple tense and the verb ‘to be’. Study the different uses of the verb ‘to be’ and how to conjugate this important verb correctly. I would then look at the nouns, pronouns, and articles, how to conjugate verbs into the present simple and the present continuous and when to use each tense.</p>
                        <p>Then you can look at some modal verbs such as modals of ability in the present, and study the placement of adverbs of frequency and the use of adjectives, the conjugation of regular and irregular verbs into the past simple tense and how to use modal verbs of ability in the past. Also, how to form imperative, negative and interrogative sentences.</p>
                        <p>Once you’ve covered the topics above, you can start studying:</p>
                        <ul><li>Countable and uncountable nouns</li><li>Adverbs of manner, time and place, how to use them correctly in a sentence.</li><li>Prepositions of time, place and direction</li><li>Prepositional phrases</li><li>Modal verbs of advice and obligation</li><li>The simple future and progressive tense</li><li>Verbs followed by an infinitive or a gerund</li><li>Collocations</li><li>The present perfect and progressive tenses</li><li>The past perfect and progressive tenses</li><li>Modal verbs of necessity</li><li>The first, second and third conditionals</li><li>Forming tag questions</li><li>Making comparisons and using superlatives</li><li>Compound, complex and compound-complex sentences</li><li>When and how to use conjugations in different types of sentences</li><li>Past tense modal verbs</li><li>Passive voice</li><li>Reported speech</li><li>Direct and indirect speech</li><li>Mixed conditionals</li><li>The future perfect and progressive tense</li><li>The subjunctive</li></ul>
                        <p>When studying a grammar topic such as the first conditional for example, it is important to understand how and when to use this conditional. It isn’t enough to only remember how to form the conditional, you have to know what situations call for this specific conditional sentence structure and the meaning of the sentence.</p>
                        <p>You also need to pay close attention to irregular verb endings or exceptions to the rules. When you learn a new grammar rule, practice using it in everyday conversations or writing exercises. You can even try to identify specific grammar rules when you’re listening to a podcast or a radio program and analyze the use of the rule in that specific situation.</p>
                        <p>But remember, grammar isn’t the only thing you need to study when learning English. It shouldn’t take all of your time. Make sure you also pay attention to learning new vocabulary, pronunciation rules, spelling patterns, conversation skills, listening skills and so on.</p>
                    </Col>
                </Row>
            </Container>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
    )
}

export default Founder