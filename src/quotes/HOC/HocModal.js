import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'


const HocModal = ChildComponent => class HocComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: true,
      nestedModal: false,
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
    })
  }


  render() {
    return (
      <Modal isOpen={this.state.modal} backdrop='static' className='quote-modal'>
        <ModalBody>
          <ChildComponent {...this.props} toggle={this.toggle} />
          <Modal
            isOpen={this.state.nestedModal}
            toggle={this.toggleNested}
            className='trader_nested-modal'
          >
            <ModalHeader>
              <strong>Terms and Conditions</strong>
              <div
                className='quote_close-btn'
                role='button'
                tabIndex={0}
                onClick={this.toggleNested}
                onKeyPress={this.toggleNested}
              >
              ✕
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='container container--sidebar'>
                <section className='section section--aml'>
                  <p><span className='aml__subtitle-2'> 1. GENERAL INFORMATION</span></p>
                  <p><span className='aml__subtitle-2'>1.1 AGREEMENT</span></p>
                  <p>The client agreement (the “Agreement”) is entered by and between
                    GoldTech Media Services OÜ with operational address Roosikrantsi
                    2-K255, 10119 Tallinn, Estonia (the “company”) who is the holder
                    of the brand name S²trade and the person and/or legal that has
                    applied to open a trading account at the Company’s trading
                    platform (the “Client”), according to the terms and conditions
                    detailed in this agreement.
                  </p>
                  <p><span className='aml__subtitle-2'> 1.2. LIABILITY </span></p>
                  <p className='section__text'>All amounts handed over by the client
                  to the company or which the company holds on behalf of the client,
                   for the provision of investment services, shall be held on behalf
                    of the Client in an account institution. The Company will not
                     be liable for any failure or insolvency of any bank or third party;
                  </p>
                  <p><span className='aml__subtitle-2'> 1.3. RISK WARNING </span></p>
                  <p className='section__text'>Before entering into this Agreement,
                   the Client should carefully read and consider the Risk Disclosure,
                    which is available on the Website. The Risk Disclosure sets
                    forth the particular risks of investing in foreign exchange
                     and contracts for differences. Company will consider the
                     request to open an account by the Client and its acceptance
                     of this request, as unequivocal evidence that the Client
                      has read and is prepared to accept the risks set out in
                      the Risk Disclosure is helpful but does not describe
                       all of the risks related to trading in contracts for
                        differences. It is the Client`s responsibility to
                         make sure it is fully aware of all these risks and
                         to take advice, if necessary, before entering into this Agreement.
                  </p>
                  <p><span className='aml__subtitle-2'> 1.4. CONFLICT OF INTEREST POLICY </span></p>
                  <p className='section__text'>The Client should be aware that,
                   when providing investment services to the Client under
                   this Agreement, Company will have interests (including
                   interests deriving from duties we owe other clients or
                    parties) in conflict with the client’s interests, and
                     some conflicts could not be effectively avoided or
                      mitigated without altering the discretionary nature
                      of the prices quoted by us. Indeed, by trading in
                       contracts for differences the Client will make
                       gains or incur losses as a result of a difference
                       in prices (or exchange rates, as applicable) at which
                        trading positions are respectively opened or closed.
                  </p>
                  <p className='section__text'>Company does not normally owe
                   best execution duties to the Client as Company deals with
                    the Client “on quotes”, so it does not execute orders
                     “on behalf” of the Client. When the Client wants to enter into
                   a particular contract with Company, it may decide whether
                    or not to do so based on the price (or exchange rate, as
                     applicable) quoted by Company for that contract. Company
                      determines the prices (or exchange rates, as applicable)
                       at which it is prepared to enter into a contract with the
                        Client (and the relevant bid-ask spread) in its absolute
                        discretion, taking into account the price levels quoted
                        by competitors and other intermediaries, general market
                        conditions as well as other factors such as the exposure
                        of Company to the underlying financial instruments.
                  </p>
                  <p className='section__text'>Please refer to the Best Execution
                   Policy on our website.
                  </p>
                  <p className='section__text'>The Client realizes and accepts
                   that this pricing process involves conflicting interests of
                   Company, which are intrinsic in the investment business Company
                   carries out under this Agreement. Company will provide trading
                   services to the Client on the basis that the Client is satisfied
                    with the pricing policies and practices of Company and believes
                    that Company’s pricing provides a fair treatment of the Client’s interests.<br />
                    Where Company may reasonably take steps to avoid or mitigate
                     conflicts arising in the supply of its services which are
                      likely to significantly affect the Client’s interests,
                      Company will do so in accordance with its Conflict of
                       Interest Policy which contains provisions, among others, designed to:
                  </p>
                  <p className='section__text'>(I) Describe the main sources
                   of conflicts or potential conflicts with the Client’s interests,
                    which may arise in the supply of services by us under this Agreement;
                  </p>
                  <p className='section__text'>(II) Establish the procedures by
                  which such conflicts will be identified and managed by Company
                  from time to time;
                  </p>
                  <p className='section__text'>(III) Express the cases where the
                  existence of a conflict must be disclosed to the Client before
                  Company can execute an order under this Agreement, so that the
                   Client may decide whether or not to confirm the order;
                  </p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(IV) Establish the procedures by
                  which the Conflict of Interest Policy will be revised when
                  needed or periodically updated.
                  </p>
                  <p className='section__text'>A summary of the Conflicts of
                  Interest Policy is available on the Website. Further details
                   will be provided upon the Client’s request.
                  </p>
                  <p><span className='aml__subtitle-2'> 1.5. SERVICES COVERED BY THE AGREEMENT</span></p>
                  <p className='section__text'>This Agreement will only apply
                  to the services described in Section 2. Other activities carried
                   out by Company – within the investment and ancillary services
                   contemplated by Section 1.2 – fall outside the scope of this Agreement.
                  </p>
                  <p><span className='aml__subtitle-2'> 1.6. CHARGES AND COMMISSIONS </span></p>
                  <p className='section__text'>All charges and commissions of Company
                   applicable under this Agreement are set out in the Rates Schedule.
                  </p>
                  <p><span className='aml__subtitle-2'> 1.7. AMENDMENTS TO THE AGREEMENT </span></p>
                  <p className='section__text'>This Agreement (including any Appendices)
                   may be amended by Company , in whole or in part, from time to time
                   as set forth in Section 17.3. Any amendment will be made by us at
                   our discretion either on notice or, in specified circumstances,
                    without prior notice. Please refer to Section 17.3 for further details.
                  </p>
                  <p><span className='aml__subtitle-2'> 1.8. ADDITIONAL INFORMATION </span></p>
                  <p className='section__text'>For additional material information
                  concerning this Agreement and the services provided by Company
                   hereunder please refer to the following Sections and the Appendices referred to within:
                  </p>
                  <p className='section__text'>(I) Best Execution Policy: Section 2;</p>
                  <p className='section__text'>(II) Reporting duties of Company :
                   Section 10;
                  </p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(III) Management of Client’s complaints: Section 18.</p>
                  <p><span className='aml__subtitle-2'> 2. COMPANY SERVICES </span> <span className='aml__subtitle-2'> 2.1. THE SERVICES </span></p>
                  <p className='section__text'>Subject to the Client fulfilling its
                   obligations under this Agreement, Company may provide the following
                    services to the Client (the “Services”):
                  </p>
                  <p className='section__text'>(I) entering into spot contracts for
                   differences with the Client on currencies, indices, precious
                   metals, oil, commodities and financial instruments and products
                   as listed in Underlying List (respectively, “Contracts” or
                    “trading positions” and the “Underlying”) acting as principal and not as a Client’s agent;
                  </p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(II) receiving and transmitting orders
                   relating to Contracts to other investment firms or authorised
                    intermediaries acting on behalf of the Client.
                  </p>
                  <p className='section__text'>The Services shall be deemed to
                  include, if Company so agrees in its sole discretion from time
                  to time, any such ancillary services, as the Client may request.
                   Unless otherwise expressly agreed to in writing by Company ,
                   when fulfilling Client orders Company shall be treated as providing
                    the Service under (i) above (“dealing on own account”).
                  </p>
                  <p><span className='aml__subtitle-2'> 2.2. COMPANY AS PROVIDER OF SERVICES </span></p>
                  <p className='section__text'>Unless otherwise expressly agreed to
                  in writing, Company shall provide the service under section 2.1 (i) by
                  fulfilling Client’s orders for its own account but not on behalf of
                  the Client. Company shall quote (either through the Platform or otherwise)
                  the price (or exchange rate, as applicable) at which it is willing to
                   enter into a particular Contract and
                  the Client may decide whether or not to enter into such Contract at
                  the price (or exchange rate, as applicable) quoted by us and on the
                   terms contemplated by this Agreement. When Company executes an
                   Order on behalf of the Client, it will generally act in accordance
                   with its order execution policy (the “Best Execution Policy”)
                    as may be amended from time to time. The current Best Execution
                     Policy has been provided to the Client and is also available on the Website.
                  </p>
                  <p className='section__text'>Company shall not provide the Client
                  with any tax or other advice in relation to the Orders placed under
                   this Agreement, the Contracts or otherwise in connection with this
                   Agreement except that Company will assess the appropriateness of
                   the Services and the merits of the Client entering into this
                   Agreement in compliance with Sections 1.4 and 3.2. The Client
                   may wish to seek independent advice before entering into this
                    Agreement and placing any Orders or entering into any Contracts
                    under this agreement.
                  </p>
                  <p><span className='aml__subtitle-2'> 2.3. ACCEPTANCE OF AGREEMENT</span></p>
                  <p className='section__text'>The client shall enter into this agreement as a principal and not as an agent for any other person unless otherwise agreed to in writing by Company .</p>
                  <p><span className='aml__subtitle-2'> 2.4. COMPANY TRADE SCHEDULE </span></p>
                  <p className='section__text'>The client acknowledges and agrees that Company will carry out its trading business 24 hours a day, 5 days a week, from Sunday at 10 pm GMT through to Friday at 10 pm GMT or during such other trading hours as are disclosed on the Website, as applicable in relation to each Underlying or market.</p>
                  <p className='section__text'>Subject to Section 2.6 and to the terms of this Agreement generally, Company will only quote prices and accept Orders or instructions in respect of any Contract during those hours.</p>
                  <p><span className='aml__subtitle-2'> 2.5. COMPANY TRADE SCHEDULE EXCEPTIONS </span></p>
                  <p className='section__text'>Where, in Company reasonable opinion, a public holiday in any jurisdiction affects the relevant underlying market, Company shall not be obliged to quote prices and will not accept orders or instructions in respect of any Contract related to that market. Company shall, from time to time, give reasonable notice of such public holidays and the affected Contracts on its website and/or within the Platform.</p>
                  <p className='section__text'>In some cases, Contracts may only be traded during the time when the relevant exchange, where the Underlying is traded, is open. Where trading relates to any such Contract, Company shall not be obliged to quote prices and will not accept Orders or instructions during any time when the relevant exchange is closed for business. Company shall endeavor to inform the Client of the Contracts that are subject to such limited trading hours on its website and/or within the Platform.</p>
                  <p><span className='aml__subtitle-2'> 2.6. COMPANY TRADE SCHEDULE CHANGES </span></p>
                  <p className='section__text'>Any change to the trading hours or other information contemplated by sections 2.5 and 2.6 shall not be treated as an amendment to this Agreement and shall take effect as and when the relevant determination of Company or event occurs with no need for prior notice to the Client (without prejudice to the obligations of Company under Section 2.6).</p>
                  <p><span className='aml__subtitle-2'> 3. ONBOARDING BONUS</span></p>
                  <p className='section__text'>3.1. The Company can offer at its own discretion, for demonstrative purposes and to enrich trader experience with Company funds under the form of Credit money, that will be used in  trading solely, beforehand the Trading Account will be credited with a deposit, from the side of the Customer.</p>
                  <p className='section__text'>3.2. Any losses incurred during the Trader’s demonstrative trading shall not reflect on the Trading Account, as the Account is capped against a negative balance and the usage of Company funds shall not create debt for the Customer. Any winnings under the form of Credit and profits resulting from the trading experience, will be credited to the Trader’s account and be available for further trading after the deposit will be made.</p>
                  <p className='section__text'>3.3. The Client understands and acknowledges upon opening the trading account, that any Credit money granted by the Company, are susceptible to the Company’s Bonus program and if the client requests to withdraw any funds before executing the required trading volume, all the credit and the profits derived from it, will be canceled automatically upon withdrawing and only after applying The Company’s Terms and Conditions.</p>
                  <p className='section__text'>3.4. The Company reserves the right, at its sole discretion, to disqualify any individual that breaches the Bonus Terms &#38; Conditions and/or any of the Company’s Terms &#38; Conditions. If the Company suspects any wrongdoing, deception, fraud or other forms of deceitful or fraudulent activity in a Client’s trading, then the Company reserves the right, at its own discretion, to:</p>
                  <ol>
                    <li>a) Deny, withhold, withdraw or cancel all the Client’s bonuses that have been provided</li>
                    <li>b) Cancel all orders and/or transactions executed and nullify all profits generated</li>
                    <li>c) Temporarily or permanently, block the Client’s access to the trading account(s) and/or block or suspend the Client’s trading account(s)</li>
                  </ol>

                  <p><span className='aml__subtitle-2'> 4. MARGIN </span> <span className='aml__subtitle-2'> 4.1. MARGIN REQUIREMENT </span></p>
                  <p className='section__text'>The client shall at all times ensure that the balance of the account is equal to or greater than the sum of all Client Deposits required by Company (each a “Margin”) in relation to open Contracts and any other exposure of the Client related to a Service provided by Company . The margin requirement needed in relation to each trading position is available under the trading specifications of each product.</p>
                  <p className='section__text'>Company may vary the Margins in its absolute discretion at any time and the new Margins shall be disclosed as indicated above and shall apply immediately to any new trading position opened by the Client.</p>
                  <p className='section__text'>If Company notifies the Client in writing of the new Margin requirements; these shall also apply immediately to all trading positions of the Client, which were already open at the time of such notice.</p>
                  <p><span className='aml__subtitle-2'> 4.2. MARGIN REQUIREMENTS ACKNOWLEDGEMENT </span></p>
                  <p className='section__text'>The client acknowledges and agrees as follows:</p>
                  <p className='section__text'>(I) The balance of the Account must at all times satisfy the Margin requirements established in accordance with Section 4.1;</p>
                  <p className='section__text'>(II) Section 4.3 shall apply in determining whether the above Margin requirements are satisfied;</p>
                  <p className='section__text'>(III) The Client must at all times monitor the Account balance against the Margin requirements;</p>
                  <p className='section__text'>(IV) Company may, but shall not be obliged to, inform the Client that the Account balance is insufficient to meet the Margin requirements in relation to existing trading positions and/or for the opening of any new trading position;</p>
                  <p className='section__text'>(V) Failure to meet the Margin requirements constitutes an Event of Default and may have adverse consequences for the Client under this Agreement;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(VI) The Margin requirements are not intended to represent the Client’s entire liability in relation to open trading positions.</p>
                  <p><span className='aml__subtitle-2'> 4.3. OPEN TRADING POSITIONS </span></p>
                  <p className='section__text'>The client’s open trading positions shall be marked to market on an on-going basis during trading hours.</p>
                  <p className='section__text'>The Client acknowledges and agrees that the Account balance may become insufficient due to:</p>
                  <p className='section__text'>(I) The market moving against the Client on one or more open trading positions (as a result of which mark-to-market losses will be entered in the Account);</p>
                  <p className='section__text'>(II) Company re-setting Margin requirements (subject to Section 4.1);</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(III) The Client being allowed to trade by Company notwithstanding Margin requirements are not met.</p>
                  <p className='section__text'>If the Account balance becomes insufficient to meet Margin requirements, then Company:</p>
                  <p className='section__text'>(a) shall not accept new trading orders (however Company may permit the Client to trade, in its absolute discretion, without prejudice to any rights and remedies of Company under this Agreement which will not be deemed to be waived by this decision);</p>
                  <p className='section__text'>(b) May but shall not be required to claim the deposit of additional Margins by the Client;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(c) Shall have a right to close one or more open trading positions of the Client as necessary to reduce Margin requirements below the Account balance.</p>
                  <p><span className='aml__subtitle-2'> 4.4. MARGIN THREATS </span></p>
                  <p className='section__text'>The client acknowledges and agrees that:</p>
                  <p className='section__text'>(I) The Platform settings may automatically stop trading activities which would result in a breach of Margin requirements (without prejudice to all rights and remedies of Company under this Agreement where the automatic stop mechanisms fail to work properly or Company elects to permit the Client to trade) or in cleared funds in the Account reducing below a set percentage of the Margin requirements;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(II) close-out of open trading positions will be made starting from those showing the largest losses (however Company may change this close-out Order as it sees fit in its absolute discretion from time to time).</p>
                  <p><span className='aml__subtitle-2'> 4.5 MARGIN IN HEDGE SITUATION </span></p>
                  <p className='section__text'>Company will require margin for every trade, including trades opened to have a hedged position. In other words, in case of a situation where the client holds offsetting short and long positions, a margin requirement will still be in place.</p>
                  <p><span className='aml__subtitle-2'> 5. TRADING </span> <span className='aml__subtitle-2'> 5.1. ACCESSING THE ACCOUNT </span></p>
                  <p className='section__text'>Upon opening the account, Company shall provide the client with a user id and an account number. The Client shall set its username and password (the “Access Codes”) to access the trading platform of Company (the “Platform”).</p>
                  <p className='section__text'>The Client can change its password at any such time as the Client deems it necessary. The Access Codes may only be used by the Client or the Attorney (if appointed) to the exclusion of any other person.</p>
                  <p className='section__text'>The Client shall not disclose the User ID, the Account number and the Access Codes (collectively, the “Account Access Information”) to any person (but the Client may disclose the Access Codes to the Attorney, if appointed) and shall use best efforts to preserve (and ensure that the Attorney, if appointed, preserves) the full confidentiality of the Access Codes.</p>
                  <p className='section__text'>The Client shall inform promptly Company in writing if the Client knows or suspects that any unauthorized person has acquired (or has attempted to acquire) knowledge of the Account Access Information.</p>
                  <p className='section__text'>Company may rely on any access to the Platform with the Access Codes as being made by the Client or the Attorney (if appointed).</p>
                  <p className='section__text'>In order to protect your computer and person data, Company recommends the use of anti-virus software with regular updates and scans being carried out. Company is not responsible for access gained to the Platform through the Client’s password being ‘stolen’ through virus or other such software.</p>
                  <p className='section__text'>Company strongly recommends against the use of password management software (whether browser based or third party software). Any access to the Platform, gained through such software, will be the Clients responsibility, regardless of whether the Client authorises this.</p>
                  <p className='section__text'>Furthermore, Company strongly recommends locking devices when not in use at all times, and where possible, making use of a password only known by the Client as again Company may rely on the use of the Platform as signaling trades carried out by the Client.</p>
                  <p><span className='aml__subtitle-2'> 5.2. ORDER COMMUNICATION BY PLATFORM </span></p>
                  <p className='section__text'>Unless a different agreement is made with Company , the Client (and the attorney, as applicable) shall send all orders relating to a Service provided by Company under this Agreement (the “Orders”) using the Platform in accordance with any terms or instructions relating to the use of the Platform, which may be published on the Website. Where Company agrees to act upon an Order transmitted by phone or in writing, it shall be regarded as doing so on the basis that:</p>
                  <p className='section__text'>(I) The price or the exchange rate (the “Price”) at which the relevant Contract would be entered into is the Price quoted by Company as displayed on the Platform or otherwise, and any such Order will be for a Contract to be entered into at such Price;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(II) Company will process the Order by entering the relevant Contract into the Platform trading system using the Access Codes provided by the Client (or the Attorney, as applicable), in each case unless a different intention is expressly and clearly stated by Company in writing.</p>
                  <p><span className='aml__subtitle-2'> 5.3. ORDER COMMUNICATION BY TELEPHONE </span></p>
                  <p className='section__text'>Where Company accepts an order transmitted by phone, it shall be regarded as doing so on the basis that:</p>
                  <p className='section__text'>(I) Company believes in its exclusive judgement to be in a position to identify the Client (or the Attorney, as applicable) in accordance with its internal procedures, but Company will not be liable for accepting an Order transmitted by an unauthorized person other than in case of gross negligence, willful default or fraud;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(II) The Client is aware and agrees that the phone call will be recorded by Company and the recording and any transcript of it will be accepted as conclusive evidence of the Order.</p>
                  <p><span className='aml__subtitle-2'> 5.4. ORDER PROCESSING AND ACCEPTANCE </span></p>
                  <p className='section__text'>Any order shall be treated as an offer from the client to enter into a contract subject to the provisions of Section 2.2. When the Client wishes to enter into a particular Contract, it may request a quote for such Contract from Company either by accessing the Platform (where Company quotes bid and ask Prices for such Contract by displaying them on the Platform during trading hours) or by submitting a verbal or written request to Company (in any other case).</p>
                  <p className='section__text'>Company may or may not accept an Order in its absolute discretion, except that we may not refuse to fulfil an Order to close out an open trading position issued by the Client in accordance with this Agreement.</p>
                  <p className='section__text'>Company may also quote a new Price for a Contract, after receiving an Order, whenever it believes re-quoting is appropriate in consideration of market conditions or for any other reason. If Company re-quotes the Price for a particular Contract, the original Order shall no longer be considered valid and binding and the Client may or may not send a new Order at the new Price quoted by us.</p>
                  <p className='section__text'>The Client may revoke any Order at any time before acceptance by us, and Company may delay the acceptance of an Order as it sees fit without giving notice to the Client and shall not be held liable to the Client for late acceptance of an Order.</p>
                  <p className='section__text'>Any Order accepted by Company shall be displayed as such on the Platform (if it relates to a Contract which may be traded on the Platform) and shall no longer be revocable by the Client.</p>
                  <p><span className='aml__subtitle-2'> 5.5. ORDER’S PRICE ACKNOWLEDGEMENT </span></p>
                  <p className='section__text'>The client acknowledges and agrees that:</p>
                  <p className='section__text'>(I) Company will quote Prices under this Agreement based on (but, for the avoidance of doubt, with no fixed or binding relationship with) the prevailing prices and rates at which an Underlying is traded on the interbank market or other financial market which Company regards as a reference market in consideration of trading volumes, bid-ask spreads and/or any other factor judged relevant by Company;</p>
                  <p className='section__text'>(II) The Prices quoted by Company including bid-ask spreads may be changed by Company at any time in its absolute discretion;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(III) Company may discretionally set Margins and minimum or maximum size for each tradable Contract and may vary them at any time in its absolute discretion (provided that any variation in minimum or maximum Contract size shall not retroactively apply to open trading positions).</p>
                  <p><span className='aml__subtitle-2'> 5.6. ORDER DISCLAIMER </span></p>
                  <p className='section__text'>The client acknowledges and agrees that software engineering, telecommunications and electricity services affecting the use of the Platform are not under the control of Company and that we shall not be responsible for:</p>
                  <p className='section__text'>(I) Any error in the transmission of an Order;</p>
                  <p className='section__text'>(II) Any misinterpretation or mistake affecting an Order sent through the Platform (including technical and/or mechanical damage);</p>
                  <p className='section__text'>(III) Any access to Client data by unauthorised persons;</p>
                  <p className='section__text'>(IV) The Client’s inability to access or use the Platform at any time;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(V) More generally, any loss or damage incurred or suffered by the Client as a result of failures in the services supplied to Company by software engineering, telecommunications and electricity service providers;</p>
                  <p className='section__text'>Company and shall not be responsible for any case, unless there is evidence given by the Client that this was caused by the gross negligence, willful default or fraud of Company. In such circumstances, Company will only be liable for damages or losses suffered or incurred by the Client which the Client proves to be the direct consequence of such gross negligence, willful default or fraud (subject to Sections 11.4 and 11.5).</p>
                  <p><span className='aml__subtitle-2'> 5.7. ORDER CHALLENGING </span></p>
                  <p className='section__text'>If the client wishes to challenge a contract or to dispute the way in which an order has been fulfilled by Company or to object to Company not accepting to fulfil an Order, it must do so by oral or written notice to Company within 2 business days as of the date of the Contract or the Order, as applicable. If the Client fails to deliver such a written notice to Company within the above term, Company shall be entitled to reject or disregard any verbal or late notice and the Client will be barred from any right to raise a valid judicial claim against Company for the relevant matter</p>
                  <p><span className='aml__subtitle-2'> 5.8. ORDER ACKNOWLEDGEMENT </span></p>
                  <p className='section__text'>The client and Company acknowledge and agree that:</p>
                  <p className='section__text'>(I) Any Contract which may be entered into under this Agreement will be a spot contract for differences in nature relating to an Underlying listed on the website;</p>
                  <p><span className='aml__subtitle-2'> 5.9. COMMISSIONS </span></p>
                  <p className='section__text'>As long as a trading position is open, a commission (the “commission”) – calculated on a daily basis as set forth in the most updated rates schedule published on the website – shall accrue to the benefit of the client or Company , as applicable, but the commission shall become due and payable as set forth below. The Account shall be debited or credited with the amount of the accrued Commission every calendar day, provided however that the Commission shall only become due and payable by the Client to Company or vice versa when a trading position is closed.</p>
                  <p><span className='aml__subtitle-2'> 5.10. PLATFORM USAGE </span></p>
                  <p className='section__text'>Technical terms and instructions regulating the use of the platform and the orders may be published by Company on the website, and such terms and instructions shall be deemed as an integral part of this agreement subject to section 17.3.</p>
                  <p><span className='aml__subtitle-2'> 5.11. PLATFORM DISCLAIMER </span></p>
                  <p className='section__text'>The parties acknowledge that errors may occur in the prices quoted by Company due to internet or connectivity failures or delays, price feed mistakes or otherwise resulting in quoted Prices materially deviating from market rates. In such circumstances, without prejudice to any rights either Company or the Client may have under common law, neither the Client nor Company will be bound by any Contract which purports to have been made (whether or not confirmed by Company) at a Price which was, or ought reasonably to have been, known to either the Client or Company to be materially incorrect at the time the Contract was entered into.</p>
                  <p className='section__text'>Except for the case of fraud, Company shall not be liable for any loss or damage suffered by the Client as a result of the reliance of the Client on a Price which the Client knew, or ought reasonably to have known, to be materially incorrect.</p>
                  <p className='section__text'>Company shall not permit any arbitrage practice or strategy designed to take advantage of price latency or other manifest errors and reserves the right to revoke any Contract entered into by the Client relying on such errors.</p>
                  <p className='section__text'>Company shall be responsible for the regular updating of the Platform software.</p>
                  <p><span className='aml__subtitle-2'> 5.12. ISLAMIC ACCOUNTS </span></p>
                  <p className='section__text'>In the event of a customer who due to its observance of Islamic religious beliefs cannot receive or pay interest, such customer may elect to designate, in the manner provided by the Company as this may be altered from time to time, their trading account to be a swap-free account not charged with or entitled to, premiums and/or rollovers and/or interest (“Islamic Account”). The customer hereby confirms and/or accepts and/or declares that a request to render their account as Islamic shall only be made due to the said Islamic religious beliefs and for no other reason whatsoever. The Company reserves the right to refuse accepting the request of a customer to designate their account as an Islamic Account, upon its sole and absolute discretion which shall be conclusive and undisputable upon the customer.</p>
                  <p className='section__text'>The customer hereby confirms and/or accepts and/or declares that all open trades shall expire and be closed automatically by the system after three (3) months, including hedge and limit positions. The trades shall expire without any prior notice.</p>
                  <p className='section__text'>In the event that the Company suspects that a customer is abusing the rights conferred to them by the classification of the account as Islamic Account, the Company has the right, without prior notice, to proceed with one or more of the following:</p>
                  <p className='section__text'>The Company may add commission upon each and every one of the trades executed on the Islamic Account; and/or</p>
                  <p className='section__text'>The Company may restrict and/or prohibit the customer from hedging their positions; and/or</p>
                  <p className='section__text'>The Company may, upon its sole discretion, close any open positions and reinstate them upon the then real market price. The customer hereby, acknowledges that they shall bear all costs derived from the aforementioned action, including but not limited to, the cost on the change of the sprea.</p>
                  <p><span className='aml__subtitle-2'> 6. PROHIBITED TRADING TECHNIQUES </span> <span className='aml__subtitle-2'> 6.1. CIRCUMVENTION &amp; RESERVE ENGINEERING </span></p>
                  <p className='section__text'>The Client shall not unlawfully access or attempt to gain access, reverse engineer or otherwise circumvent any security measures that we have applied to Company’s system. If, at sole discretion, the Client is in breach of this clause, Company may terminate Client’s access to the services immediately and/or have the account blocked, and Company may inform Interested Third Parties of Client’s breach of this clause. Company has, and will continue to develop any tools necessary to identify fraudulent or unlawful use of the Service.</p>
                  <p><span className='aml__subtitle-2'> 6.2. ARTIFICIAL INTELLIGENCE </span></p>
                  <p className='section__text'>It is absolutely prohibited to use any software, at Company’s sole discretion, which purpose is to apply any kind of artificial intelligence analysis to Company’s system relating to the use of Company’s Service. In the event that Company determines, at own discretion, that artificial intelligence software has been used, Company reserves the right to take action as seen fit, including completely blocking access to the Service and/or terminating the user account. Company reserves the right to seize any profits and/or revenues generated directly or indirectly by exercising prohibit trading activity as described in this section.</p>
                  <p><span className='aml__subtitle-2'> 6.3. ABUSIVE TRADING TECHNIQUE </span></p>
                  <p className='section__text'>Internet, connectivity delays and price feed errors sometimes create a situation where the prices displayed on the Company trading platforms do not actually reflect the market rates, either generally as a result of connectivity delays, upon the occurrence of a market event or an abnormal trading conditions. Trading strategies aimed at exploiting errors in prices and/or concluding trades at off-market prices, or taking advantage of these internet delays (such a scalping or sniping), cannot exist in an OTC market where the client is buying or selling directly from the market maker. Therefore, the minimum duration for a trade is 5 minutes.</p>
                  <p className='section__text'>Such trading strategies are not permissible on Company’s trading platform. If Company can reasonably demonstrate that the Client, based on its trading strategy or other behaviour, deliberately and/or systematically exploited or attempted to exploit such errors in prices and/or off-market prices, Company is entitled to take one or more of the following counter measures within 30 days as of the time Company has identified such techniques:</p>
                  <p className='section__text'>(I) Adjust the price spreads available to the Client;</p>
                  <p className='section__text'>(II) Restrict or delay the Client’s execution and/or Client’s access to streaming, instantly tradable quotes, including by providing manual quotations only;</p>
                  <p className='section__text'>(III) Reclaim from the Client’s account any historic trading profits that Company can demonstrate have been gained through such abuse at any time;</p>
                  <p className='section__text'>and/or</p>
                  <p className='section__text'>(IV) Terminate the account immediately by giving written notice.</p>
                  <p className='section__text'>Any dispute arising from such quoting or execution errors will be resolved by Company at its sole and absolute discretion.</p>
                  <p><span className='aml__subtitle-2'> 7. COMPANY’S RIGHT TO CLOSE OUT CONTRACTS </span> <span className='aml__subtitle-2'> 7.1. TERMS FOR CONTRACT DISMISSAL </span></p>
                  <p className='section__text'>Company may close out all or some of the client’s trading positions in the following cases:</p>
                  <p className='section__text'>(I) Company is required to do so by any regulatory or other authority;</p>
                  <p className='section__text'>(II) Company knows or has reasons to suspect that the trading positions concerned have been opened by the Client in breach of any applicable Law and Regulations;</p>
                  <p className='section__text'>(III) The Client fails to make Margin or other payments due to Company under this Agreement or does not perform any other obligation owed to Company under this Agreement or any transaction contemplated by this Agreement;</p>
                  <p className='section__text'>(IV) The Account balance falls below the Margin requirements established by Company in compliance with Sections 4.1 and 4.3;</p>
                  <p className='section__text'>(V) A Force Majeure Event occurs;</p>
                  <p className='section__text'>(VI) A Hedging Event occurs with respect to one or more trading positions;</p>
                  <p className='section__text'>or</p>
                  <p className='section__text'>(VII) Company exercises closing-out rights subsequent to variation of this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 7.2. CONTRACT RELEASING </span></p>
                  <p className='section__text'>Any decision to close out all or some of the client’s trading positions under section 7.1 shall be made by Company in its sole discretion.</p>
                  <p><span className='aml__subtitle-2'> 8. PAYMENTS AND SET-OFF </span> <span className='aml__subtitle-2'> 8.1. CLIENT OBLIGATIONS </span></p>
                  <p className='section__text'>The client shall be required to pay to Company, without limitation:</p>
                  <p className='section__text'>(I) The margins set out in accordance with sections 4.1 and 4.3 (subject to a minimum initial deposit as indicated in the Rates Schedule);</p>
                  <p className='section__text'>(II) The amounts due under any Contracts (including trading losses and the Commissions provided for by this Agreement);</p>
                  <p className='section__text'>(III) The amount of any taxes paid by Company on behalf of the Client (if any);</p>
                  <p className='section__text'>(IV) Any indemnity due by the Client under this Agreement;</p>
                  <p className='section__text'>(V) Such additional amounts as Company may reasonably require from time to time to secure the Client’s obligations to Company;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(VI) Any debit balance on any Account (without duplication).</p>
                  <p><span className='aml__subtitle-2'> 8.2. APPLICABLE CLIENT CHARGES </span></p>
                  <p className='section__text'>A flat fee in value of 25 USD due for withdrawal operations of Client’s funds released from Company, in favour of the Client, in accordance with Section 3.12 and 3.13, will be deducted from Client’s funds when processing the payment by wire transfer. No fee will be applied for withdrawal via e-wallet or credit card.</p>
                  <p><span className='aml__subtitle-2'> 8.3. ADDITIONAL CLIENT CHARGES </span></p>
                  <p className='section__text'>The client shall be responsible for payment (or reimbursement to Company, as applicable) of all VAT, stamp duty or other taxes levied or claimed by any taxing authority or otherwise arising in any jurisdiction in relation to any Contract entered into under this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 8.4. PAYMENT WITHHOLDING OR DEDUCTING </span></p>
                  <p className='section__text'>Company shall have the right to withhold or deduct from any payment made to the client under this Agreement or credited to the Account any amount required by applicable law to be withheld or deducted from any such payment or credit.</p>
                  <p><span className='aml__subtitle-2'> 8.5. COST AND TAX DISCLAIMER </span></p>
                  <p className='section__text'>The client shall be required to indemnify Company from and against all costs, claims, actions, proceedings, damages, expenses and liabilities arising as a consequence of the Client failing to make a tax payment as and when due in relation to any Contract entered into under this Agreement or to reimburse Company for any tax payment made by it on behalf of Client.</p>
                  <p><span className='aml__subtitle-2'> 8.6. RECONCILIATIONS </span></p>
                  <p className='section__text'>Company shall have the right to set off any credit balance on the account or other sum due by Company to the Client against any debit balance or other sum due by the Client to it. This set off right may be exercised by Company in its absolute discretion and without notice to the Client.</p>
                  <p><span className='aml__subtitle-2'> 9. CLIENT MONEY </span> <span className='aml__subtitle-2'> 9.1. FORECASTING ACKNOWLEDGEMENT </span></p>
                  <p className='section__text'>Company shall determine in its sole discretion the portion of the client deposits which is required to secure the present or future, actual or contingent liabilities and obligations of the Client to Company on a daily basis (which determination shall be based on the Client’s open trading positions and shall take account of market conditions as well as any other event or circumstance believed to be relevant by Company in its exclusive judgement).</p>
                  <p><span className='aml__subtitle-2'> 9.2. CLIENT DEPOSIT OWNERSHIP </span></p>
                  <p className='section__text'>The client deposits shall remain deposited in the Company account which Company may hold. Section 3.8 shall apply to Client Deposits held in the Company Client Account.</p>
                  <p><span className='aml__subtitle-2'> 10. CLIENT REPORTING </span> <span className='aml__subtitle-2'> 10.1. CONTRACT REPORTING </span></p>
                  <p className='section__text'>In respect of each contract entered into under this agreement, Company shall send the client a note (the “Contract Note”) and, after closing out of the trading position, a balance of the account (the “Difference Account”). Such reports shall be delivered to the Client, electronically by email no later than close of business of the next business day following the day on which a Contract is concluded or closed out.</p>
                  <p><span className='aml__subtitle-2'> 10.2. ANNUAL REPORTING </span></p>
                  <p className='section__text'>In respect of each account, Company shall send the client an annual statement of account (the “Annual Statement of Account” and, together with Contract Notes and Difference Accounts, the “Reports”) by email no later than 2 weeks after the end of each calendar year.</p>
                  <p><span className='aml__subtitle-2'> 10.3. REPORTING RELAYING </span></p>
                  <p className='section__text'>Any report to be delivered to the client under this agreement may be sent by Company in electronic form and may also be made available to the Client on the Platform with the reporting duties of Company being accomplished by a notice delivered by Company in accordance with Section 17.9 advising the Client that the Report is available on the Platform.</p>
                  <p><span className='aml__subtitle-2'> 10.4. REPORTING DISCLAIMER </span></p>
                  <p className='section__text'>The client should verify the contents of each report without delay. In the absence of manifest error, each Report shall be conclusive evidence of the trading activities and other facts stated therein unless the Client notifies Company of any mistake, error or inaccuracy within 3 business days of receipt of the Report or the notice under Section 10.3.</p>
                  <p><span className='aml__subtitle-2'> 11. INDEMNITY AND LIABILITY </span> <span className='aml__subtitle-2'> 11.1. EXEMPTION FROM INCURRED PENALTIES OR LIABILITIES </span></p>
                  <p className='section__text'>The client shall indemnify Company, its affiliates, employees, agents, successors and assigns (each an “Indemnified Party”) on demand from and against all costs, claims, actions, proceedings, damages, expenses and liabilities of any nature whatsoever (whether present, future, contingent or otherwise and including legal fees) which an Indemnified Party may suffer or incur (collectively, the “Indemnified Party Losses”) as a direct or indirect consequence of:</p>
                  <p className='section__text'>(I) Any false representation or breach of warranty given by the Client under or in connection with this Agreement (including, without limitation, in the Application Form);</p>
                  <p className='section__text'>(II) A breach by the Client of any of its obligations under this Agreement;</p>
                  <p className='section__text'>(III) Company exercising its rights under Section 13 (Events of Default);</p>
                  <p className='section__text'>or</p>
                  <p className='section__text'>(IV) Any other event contemplated by this Agreement as being subject to indemnification by the Client unless and to the extent such Indemnified Client Losses are suffered or incurred as a result of the gross negligence, wilful default or fraud of Company.</p>
                  <p><span className='aml__subtitle-2'> 11.2. INDEMNITY DISCLAIMER </span></p>
                  <p className='section__text'>Without prejudice to the generality of the foregoing, the client shall indemnify Company and any other Indemnified Party from and against all direct and indirect Indemnified Party Losses resulting from:</p>
                  <p className='section__text'>(a) The use of programmable trading systems (whether e-signed/ manufactured by the Client or any third party) executed on or using the Platform,</p>
                  <p className='section__text'>or</p>
                  <p className='section__text'>(b) Any claims against an Indemnified Party raised by a Client’s customer or other person in whose interest or behalf the Client has traded with Company under this Agreement (whether in breach of this Agreement or otherwise).</p>
                  <p><span className='aml__subtitle-2'> 11.3. LIABILITIES </span></p>
                  <p className='section__text'>Any liability of Company to the client under applicable law for breach of this agreement or any representation, statement, act or omission including negligence arising under or in relation to this Agreement (including any liability for acts or omissions of employees, agents and sub-contractors of Company ) shall be subject to the imitations set out in Section 11.4 (subject to Section 11.5).</p>
                  <p><span className='aml__subtitle-2'> 11.4. DENIAL OF LIABILITY </span></p>
                  <p className='section__text'>Company shall not be liable to the client for:</p>
                  <p className='section__text'>(I) Costs, claims, actions, proceedings, damages, expenses and liabilities which the Client may suffer or incur (collectively, the “Client Losses”) unless and to the extent that such Client Losses are suffered or incurred as a result of the gross negligence, willful default or fraud of Company;</p>
                  <p className='section__text'>(II) Any Client Losses being the indirect or consequential effect of any act or omission for which Company is liable to the Client including, without limitation, loss of profit, loss of business, loss of goodwill or reputation or other claims for consequential compensation;</p>
                  <p className='section__text'>(III) Any Client Losses suffered or incurred as a direct, indirect or consequential result of any error in any Order, instruction, information given by the Client (or the Attorney, as applicable) or of Company acting upon any Order or instruction given, or which appears to be given, by the Client (or the Attorney, as applicable);</p>
                  <p className='section__text'>(IV) Any adverse tax consequences of any trade;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(V) Any other fact, circumstance, event or situation for or in respect of which Company is not liable pursuant to specific exclusions or other terms of this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 11.5. EXCEPTIONAL LIABILITY CONDITIONS </span></p>
                  <p className='section__text'>Nothing in Section 11.4 may exclude or limit the liability of Company for death or personal injury caused by its negligence or any liability owed by Company to the Client under applicable law or regulations governing investment services and other financial activities performed by Company under this Agreement (the “Law and Regulations”) which Company is not entitled to contract out. Company reserves the right to take any action it considers necessary to comply with applicable Law and Regulations. In the event of conflict or inconsistencies between any term of Agreement and any applicable Law and Regulations, the latter shall prevail.</p>
                  <p><span className='aml__subtitle-2'> 12. REPRESENTATIONS, WARRANTIES AND COVENANTS OF THE CLIENT </span> <span className='aml__subtitle-2'> 12.1. CLIENT WARRANTIES </span></p>
                  <p className='section__text'>The client represents and warrants that:</p>
                  <p className='section__text'>(I) All information supplied by the Client to Company is complete, true, accurate and not misleading in any material respect;</p>
                  <p className='section__text'>(II) The Client has entered into this Agreement and will enter into any Contract thereunder as a principal and not as another party’s agent or representative;</p>
                  <p className='section__text'>(III) The Client is not subject to any legal disability and is not subject to any law or regulation preventing performance of this Agreement or any Contract or transaction entered into thereunder by the Client;</p>
                  <p className='section__text'>(IV) The Client has obtained all necessary consents, licenses and authorisations and has full power and authority to enter into this Agreement and any Contract or transaction thereunder;</p>
                  <p className='section__text'>(V) The Client is in compliance with all laws and regulations to which the Client is subject in relation to this Agreement and any Contract or transaction thereunder including, without limitation, all tax laws and regulations, exchange control requirements, and registration requirements;</p>
                  <p className='section__text'>(VI) This Agreement and any Contract or transaction entered into thereunder create valid and binding obligations which are enforceable against the Client in accordance with their terms (subject to applicable principles of equity) in the jurisdiction in which the Client is resident and do not violate the terms of any law, regulation, order, charge, agreement or instrument by which the Client is bound or to which the Client’s assets are subject;</p>
                  <p className='section__text'>(VII) No Event of Default or any other event which may become (with the passage of time, the giving of notice, the making of any determination or any combination of these) an Event of Default (a “Potential Event of Default”) has occurred and is continuing with respect to the Client;</p>
                  <p className='section__text'>(VIII) The Client is fully aware of the financial and other risks involved with trading under this Agreement and is willing and financially able to sustain a total loss of funds resulting from the Contracts and transactions entered into thereunder;</p>
                  <p className='section__text'>(IX) All cash given to Company by the Client to satisfy Margin requirements or for any other purpose is and will be free from any charge, lien, pledge or encumbrance and is also beneficially held by the Client;</p>
                  <p className='section__text'>(X) The Client has consistent and uninterrupted access to internet service and the e-mail address provided to Company on the Application Form;</p>
                  <p className='section__text'>(XI) The Client will not enter into any Contract or transaction under this Agreement for the purposes of or in connection with any placing, issue, distribution, offer, take-over, merger or other similar corporate finance-type transaction, as applicable;</p>
                  <p className='section__text'>(XII) The Client will act in accordance with applicable law and regulations regarding market abuse, manipulation or misconduct, insider dealing and similar offences, as applicable;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(XIII) The Client will not undertake any act nor engage in any activity, other than in the normal course of business, which seeks to or may alter, distort or otherwise manipulate the relevant market or Underlying in relation to a Contract or transaction entered into under this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 12.2. INCURRENCE OF WARRANTIES </span></p>
                  <p className='section__text'>The representations and warranties under section 11.1 shall be deemed to be repeated each time the Client provides Company with Orders or instructions to enter into any Contract or transaction under this Agreement. The Client acknowledges and agrees that the above representations and warranties have been a material inducement to the decision of Company to enter into this Agreement with the Client.</p>
                  <p><span className='aml__subtitle-2'> 12.3. CLIENT WARRANTIES DISCLAIMER </span></p>
                  <p className='section__text'>The client covenants to Company and undertakes that:</p>
                  <p className='section__text'>(I) The Client will at all times obtain and comply with, and do all that is necessary to maintain in full force and effect, all powers, authority, consents, licenses and authorisations referred to in Section 12.1;</p>
                  <p className='section__text'>(II) The Client will promptly notify Company of the occurrence of any Event of Default or Potential Event of Default;</p>
                  <p className='section__text'>(III) The Client will use all reasonable endeavors to ensure compliance with Law and Regulations as applicable in relation to this Agreement and any Contract or transaction entered into hereunder;</p>
                  <p className='section__text'>(IV) The Client will promptly notify Company of any change to the information provided to Company upon entering into, or otherwise in connection with, this Agreement;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(V) Upon demand, the Client will promptly provide Company with any additional information Company may reasonably require to comply with applicable Law and Regulations or any other legal requirement applicable to Company including, without limitation, in connection with this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 13. TERMINATION </span> <span className='aml__subtitle-2'> 13.1. TERMINATION CONDITIONS </span></p>
                  <p className='section__text'>This agreement may be terminated by the client at any time by giving written notice to Company.</p>
                  <p className='section__text'>This Agreement may be terminated by Company at any time by giving 10 business days’ notice to the Client, except that Company may terminate this Agreement immediately:</p>
                  <p className='section__text'>(I) If the Client fails to perform any provision of this Agreement;</p>
                  <p className='section__text'>(II) Upon the occurrence of any Event of Default;</p>
                  <p className='section__text'>or</p>
                  <p className='section__text'>(III) If the Client has no open positions on the Account at the time when the notice of termination is sent.</p>
                  <p><span className='aml__subtitle-2'> 13.2. TERMINATION DISCLAIMER </span></p>
                  <p className='section__text'>The termination of this agreement shall be without prejudice to any accrued rights and remedies of the parties and the existence and enforceability of any open contract, which will continue in full force and effect until close in accordance with this agreement unless otherwise determined by Company.</p>
                  <p><span className='aml__subtitle-2'> 13.3. TERMINATION FEES </span></p>
                  <p className='section__text'>No penalty shall be payable by either party on termination of this agreement. Any amount payable by the Client to Company shall become immediately due and payable including, without limitation:</p>
                  <p className='section__text'>(I) All outstanding fees, charges and commissions;</p>
                  <p className='section__text'>(II) Any dealing expenses incurred by us in terminating this Agreement;</p>
                  <p className='section__text'>(III) Any losses and expenses realised in closing out any Contract or settling outstanding obligations incurred by us on behalf of the Client;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(IV) Any indemnification owed by the Client to Company under this Agreement.</p>
                  <p className='section__text'>Company may consolidate all or any of the Accounts into one Account and deduct all amounts due to Company before transferring any credit balance on the Account(s) (net of Margin requirements on continuing trading positions, if any) to the Client.</p>
                  <p><span className='aml__subtitle-2'> 13.4. POST TERMINATION OBLIGATIONS </span></p>
                  <p className='section__text'>The obligations under Sections 11 (Indemnity and Limitation of Liability), 15 (Confidentiality) and 17.10 (Governing Law and Jurisdiction) will survive the termination of this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 14. EVENTS OF DEFAULT </span> <span className='aml__subtitle-2'> 14.1. OCCURRENCE </span></p>
                  <p className='section__text'>If at any time:</p>
                  <p className='section__text'>(I) The Client fails to make any payment when due under this Agreement or to perform any other material obligation under this Agreement or any Contract or transaction entered into thereunder;</p>
                  <p className='section__text'>(II) Any action is taken or event occurs which Company reasonably considers might have a material adverse effect upon the Client’s ability to perform any of its material obligations under this Agreement;</p>
                  <p className='section__text'>(III) Any action is taken or event occurs which Company reasonably considers to be or might be a violation of any applicable Law and Regulations or good standards of market practice;</p>
                  <p className='section__text'>(IV) The Client dies or becomes of unsound mind or, where the Client is a legal entity, the Client is dissolved or any registration required for its capacity or existence is revoked, terminated or otherwise ends, or proceedings are commenced seeking or proposing the Client’s dissolution or the revocation, termination or end of such registration;</p>
                  <p className='section__text'>(V) The Client becomes unable to pay its debts as they fall due or is bankrupt or insolvent (as defined under any bankruptcy or insolvency law applicable to the Client) or any indebtedness of the Client is not paid on the due date therefor or becomes capable at any time of being declared due and payable before the due date of payment set forth in any agreement or instrument;</p>
                  <p className='section__text'>(VI) Any voluntary or involuntary procedure is commenced by or against the Client seeking or proposing liquidation, reorganisation, an arrangement or composition with creditors, a freezing action or moratorium or other similar relief with respect to the Client or the Client’s debts under any bankruptcy, insolvency, regulatory, supervisory, corporate, tax or similar law, or seeking the appointment of a trustee, receiver, liquidator, conservator, administrator, insolvency officer or other similar official with respect to the Client or any substantial part of the Client’s assets, or the Client takes any corporate steps to authorise any of the foregoing;</p>
                  <p className='section__text'>(VII) Any representation or warranty given by the Client proves to have been or becomes untrue, false or misleading in any material respect;</p>
                  <p className='section__text'>(VIII) Any regulator of the business of Company requires us to take any of the actions under Section 14.2;</p>
                  <p className='section__text'>or</p>
                  <p className='section__text'>(IX) Company reasonably considers that any of the circumstances set out in points (i)-(viii) above are likely to occur, then, we may exercise all or any of its rights under Section 14.2. Each of the circumstances contemplated in this Section 14.1 shall be referred to as an “Event of Default”.</p>
                  <p><span className='aml__subtitle-2'> 14.2. EVENT OF DEFAULT CONSEQUENCE </span></p>
                  <p className='section__text'>Upon the occurrence of an event of default Company may, in its absolute discretion and without notice to the Client:</p>
                  <p className='section__text'>(I) Close, combine or consolidate any or all of the open Contracts of the Client (in whole or in part) at such time or times and at such Price or Prices as are reasonably determined by Company, retain any sum owed by the Client to Company and exercise its rights of set-off under Section 7.6 (provided that this will not limit the cases where Company may exercise its rights of set-off under this Agreement);</p>
                  <p className='section__text'>(II) Consolidate all or any of the Accounts and close or suspend any or all of such Accounts;</p>
                  <p className='section__text'>(III) Refuse to accept any further Order from the Client and/or terminate this Agreement (provided that this will not limit the cases where Company may exercise such rights under this Agreement);</p>
                  <p className='section__text'>(IV) Enter into any transaction, at such rate and at such time as is necessary to enable Company to meet the obligations incurred under a Contract entered into by the Client hereunder;</p>
                  <p className='section__text'>and/or</p>
                  <p className='section__text'>(V) Treat any or all of the Contracts as having been repudiated by the Client, in which event the obligations of Company under such Contracts will be cancelled and terminated.</p>
                  <p className='section__text'>Upon the occurrence of an Event of Default, Company may exercise all or any of its rights under Section 14.2 as it sees fit with a view to protecting its interests and without being accountable to the Client for any adverse consequences on the Client of its exercising such rights.</p>
                  <p className='section__text'>Company shall not lose any of its rights under Section 14.2 if the exercise of such rights is delayed for any reason.</p>
                  <p className='section__text'>The rights of Company under Section 14.2 shall be in addition to any other right and remedy Company may have under applicable law. Company shall endeavour to notify the Client of all actions and steps taken pursuant to its rights under Section 14.2 as soon as reasonably practicable.</p>
                  <p><span className='aml__subtitle-2'> 15. FORCE MAJEURE AND HEDGING EVENTS </span> <span className='aml__subtitle-2'> 15.1. FORCE MAJEURE </span></p>
                  <p className='section__text'>Any events beyond the control of Company will be deemed as “force majeure events” including, without limitation, the following:</p>
                  <p className='section__text'>(I) Any breakdown or failure of any transmission or communication system or equipment or computer facility or trading software, whether belonging to Company , the Client, any market or any settlement or clearing system occurs;</p>
                  <p className='section__text'>(II) Company is unable to maintain an orderly market, in respect of one or more of the Underlying, as a result of the occurrence of any act, omission or event (including, but not limited to, any circumstances beyond the control of Company such as strike, riot, war, terrorism, civil unrest or failure of power to supply, communications or other infrastructure);</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(III) Any underlying market or Underlying is subject to, or affected by, suspension, closure, liquidation, abandonment, imposition of limits or special or unusual terms, or excessive movement, volatility or loss of liquidity.</p>
                  <p><span className='aml__subtitle-2'> 15.2. FORCE MAJEURE DISCLAIMER </span></p>
                  <p className='section__text'>If any force majeure event arises, Company shall not be liable to the client for any failure, hindrance or delay in performing its obligations under this Agreement for the duration of the Force Majeure Event or for taking or omitting to take any action set out in this Section 15.2 below. Company may additionally, at its reasonable discretion and without prejudice to any other rights:</p>
                  <p className='section__text'>(I) Alter normal trading times;</p>
                  <p className='section__text'>(II) Modify Margin requirements (which may result in the Client being required to provide additional Margins);</p>
                  <p className='section__text'>(III) Depart or derogate from this Agreement or any Contract entered into thereunder insofar as it is impractical or impossible for Company to comply with its obligations;</p>
                  <p className='section__text'>(IV) Close any or all open Contracts and/or cancel Orders or instructions as Company reasonably deems to be appropriate in the circumstances;</p>
                  <p className='section__text'>and</p>
                  <p className='section__text'>(V) Take or omit to take all such other actions as Company reasonably deems to be appropriate in the circumstances having regard to the position of Company , the Client or other customers.</p>
                  <p className='section__text'>Company shall inform the Client as soon as reasonably practicable if it determines that a Force Majeure Event exists or has existed.</p>
                  <p><span className='aml__subtitle-2'> 15.3. HEDGING EVENTS </span></p>
                  <p className='section__text'>A “Hedging Event” shall be deemed to occur, in respect of any contract entered into hereunder, if Company is unable or where it is impractical for us, after using reasonable efforts, to acquire, establish, re-establish, substitute, maintain, unwind, or dispose of any transaction or asset we deems necessary or appropriate to hedge its price risk relating to the Contract.</p>
                  <p className='section__text'>If Company determines, in its reasonable opinion, that a Hedging Event exists in relation to any open Contract, Company may (without prejudice to any other rights and in its sole discretion), close the relevant Contract as it deems to be appropriate in the circumstances. In such a case, Company shall provide the Client with 1 business day notice of its intention to exercise its rights under this Section 15.3.</p>
                  <p><span className='aml__subtitle-2'> 16. DATA PROTECTION AND CONFIDENTIALITY </span> <span className='aml__subtitle-2'> 16.1. KNOW YOUR CLIENT (KYC) COMPLIANCE RULES </span></p>
                  <p className='section__text'>Personal information (possibly including sensitive data) provided by Client to Company by opening the Account, placing Orders and entering into Contracts may be processed by Company for the purposes of performing its obligations under this Agreement, administering the relationship with the Client and analysing, improving and developing the trade products and services of Company . The above data may be disclosed to service providers and other suppliers for any purpose relating to the operation of the Account including, but not limited to, processing of instructions, generation of confirmations, operation of control systems and management of information systems, allowing staff of service providers and other suppliers who share the responsibility for managing the relationship between Company and the Client to view such data.</p>
                  <p className='section__text'>Company may also disclose the above data to the Client’s introducing broker or agent, if any, as necessary to enable them to administer the relationship with the Client or to take any action in connection therewith.</p>
                  <p><span className='aml__subtitle-2'> 16.2. PERSONAL INFORMATION DISCLAIMER </span></p>
                  <p className='section__text'>Unless the client requires Company not to do so, personal information may also be used by Company (and shared with the parties indicated above, as necessary) for marketing to the Client our products and services, as well as those of third parties which we believes may be of interest to the Client.</p>
                  <p className='section__text'>Please note that financial personal data (such as card numbers, cardholder information, etc.) cannot be shared with 3rd parties (such as other merchants, business partners, etc.).</p>
                  <p><span className='aml__subtitle-2'> 16.3. PERSONAL INFORMATION SECURITY PROCEDURES </span></p>
                  <p className='section__text'>Company has security procedures covering the storage and disclosure of the client’s personal information to prevent unauthorised access and to comply with legal obligations. Before transferring personal data to service providers, other suppliers or parties for processing or other purposes, we shall ensure that adequate contractual arrangements complying with applicable legal standards are in place to protect the confidentiality of the information.</p>
                  <p><span className='aml__subtitle-2'> 16.4. PERSONAL INFORMATION OPPOSABILITY </span></p>
                  <p className='section__text'>The client may require Company to provide details of the personal information held about the Client, the purposes for which the information is processed and the persons or class of persons to whom the information is disclosed.</p>
                  <p className='section__text'>Company may charge a fee to provide these details, the amount of which is available upon request.</p>
                  <p className='section__text'>The Client may also require Company to correct, delete and/or block personal information from further processing if that information is inaccurate.</p>
                  <p><span className='aml__subtitle-2'> 16.5. CONFIDENTIALITY </span></p>
                  <p className='section__text'>Subject to the foregoing, neither party may disclose to any person any information relating to the business, investments, finances or other matters of a confidential nature of the other party of which it may become possessed in connection with this Agreement and its performance by the other party, and each party shall use all reasonable endeavours to prevent such disclosure.</p>
                  <p className='section__text'>Notwithstanding the above, each party (the “Disclosing Party”) may disclose information about the other party, this Agreement, the Account and any trade thereon as the Disclosing Party may be required by any law, rule or regulatory, law enforcement or tax authority or as the Disclosing Party reasonably believes to be necessary to properly perform its obligations under this Agreement or to exercise and enforce its rights thereunder (including, without limitation, as set forth in Section 17.4) without prior notice to the other party.</p>
                  <p><span className='aml__subtitle-2'> 17. MISCELLANEOUS </span> <span className='aml__subtitle-2'> 17.1. AGREEMENT NULLIFICATION </span></p>
                  <p className='section__text'>If at any time any provision of this agreement becomes illegal, invalid or unenforceable under applicable law, the legality, validity and enforceability of the other provisions of this Agreement shall not be affected thereby.</p>
                  <p><span className='aml__subtitle-2'> 17.2. AGREEMENT ENFORCEMENT </span></p>
                  <p className='section__text'>This agreement, together with any appendices and any contract notes, Difference Accounts and other Reports sent by Company to the Client in respect of each Contract contemplated by this Agreement and the Account(s), forms the entire agreement between Company and the Client in relation to the FX activities of Company.</p>
                  <p className='section__text'>This Agreement supersedes all prior oral or written representations, arrangements, understandings and/or agreements between the Client and Company in relation to the FX activities of Company (including any agreement between the Client and any third party which has been assigned to Company , if any).</p>
                  <p className='section__text'>Company has not made (and the Client may not rely on) any representation, arrangement, understanding or agreement not expressly referred to or set out in this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 17.3. AGREEMENT CHANGES </span></p>
                  <p className='section__text'>Company may vary this agreement at any time, including the rates schedule, by written notice to the Client. Without prejudice to Section 4.1, any change to the Margin requirements and the summary of the Best Execution Policy may apply with immediate effect. All other changes shall become effective on the date specified in the notice, which may not be less than 10 business days after delivery of the notice to the Client (which has the right, after the notice, to close out open trading positions and/or to terminate this Agreement at any time in accordance with the terms of this Agreement).</p>
                  <p className='section__text'>Company may also at any time, by written notice to the Client, cease to accept trading positions in respect of a specified Underlying. The date on which Company ceases to accept Orders for such Underlying shall be specified in the notice and shall at least be 10 business days after delivery of the notice. The Client is required to close out all open positions relating to such Underlying before the effective date specified in the notice and, if the Client fails to do so, Company may close out all remaining trading positions effective from the close of trading on the effective date indicated in the notice in accordance with the terms of this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 17.4. ASSIGNMENT OR DELEGATION </span></p>
                  <p className='section__text'>The client may not assign (or purport to assign) rights or delegate (or purport to delegate) obligations under this Agreement to any person without the consent of Company, nor charge (or purport to charge) any of the Client’s rights under this Agreement (including any rights to deposits held with Company).</p>
                  <p className='section__text'>Company may assign rights and delegate obligations under this Agreement and Contracts entered into thereunder to any person on giving the Client not less than 1 months’ notice. However, where the Client is in default of its obligations under this Agreement, Company may assign to other persons with immediate effect all or any of its rights in respect of monies owing to Company or remedies available to us under this Agreement. If Company makes such an assignment of rights or delegation of obligations, the Client may be required to acknowledge in writing that the assignee or delegate has assumed the relevant rights and obligations of Company.</p>
                  <p className='section__text'>Notwithstanding anything to the contrary contained in this Agreement, Company may disclose to any actual or potential assignee or delegate such information relating to the Client and the relationship between the Client and Company as Company sees fit.</p>
                  <p><span className='aml__subtitle-2'> 17.5. RIGHTS AND REMEDIES </span></p>
                  <p className='section__text'>The rights and remedies set forth in this agreement are cumulative and not exclusive of any other rights and remedies provided for by applicable law. Company is under no obligation to exercise any rights and remedies in a manner or at a time beneficial to the Client.</p>
                  <p><span className='aml__subtitle-2'> 17.6. DELAY, OMISSION AND WAIVER </span></p>
                  <p className='section__text'>No delay or omission on the part of Company in exercising any right, power or remedy provided by law or under this Agreement, or any partial or defective exercise thereof, may</p>
                  <p className='section__text'>(a) impair or prevent any further or other exercise of such right, power or remedy,</p>
                  <p className='section__text'>or</p>
                  <p className='section__text'>(b) Operate as a waiver of such right, power or remedy. No waiver or relaxation of any right, power or remedy relating to any term of this Agreement or breach thereof may (unless expressly agreed in writing by the waiving party) be construed as a waiver or relaxation of rights, powers or remedies relating to the same term or a future breach thereof or as authorising a continuation of a particular breach.</p>
                  <p><span className='aml__subtitle-2'> 17.7. RECORDS </span></p>
                  <p className='section__text'>The records of Company, unless proved to be wrong, shall be proper evidence of the Client’s dealings with Company under this Agreement. The Client shall not object to the admission of such records as evidence in legal proceedings because the records are not originals, are not in writing or are documents produced by a computer. The Client shall not rely on Company to comply with its record keeping obligations although the records of Company may be made available to the Client on request, in the absolute discretion of Company.</p>
                  <p><span className='aml__subtitle-2'> 17.8. THIRD PARTY RIGHTS </span></p>
                  <p className='section__text'>No provision of this agreement is intended to be enforceable by any person who is not a party to this Agreement.</p>
                  <p><span className='aml__subtitle-2'> 17.9. NOTICES AND COMMUNICATIONS </span> <span className='aml__subtitle-2'> 17.9.1. COMMUNICATION DETAILS OF THE PARTIES </span></p>
                  <p className='section__text'>Any notice or other communication given or made under or in connection with the matters contemplated under this Agreement shall, except where oral communication is expressly provided for, be in writing and shall be sent to the address below:</p>
                  <p className='section__text'>(I) Where Company is the intended recipient:</p>
                  <p className='section__text'>E-mail address: <a href='mailto:support@s2trade.com'>support@s2trade.com</a></p>
                  <p className='section__text'>(II) Where the Client is the intended recipient: the address, the telephone, the facsimile numbers and the e-mail address the Client provided to Company for this purposes on the Application Form.</p>
                  <p><span className='aml__subtitle-2'> 17.9.2. MEANS OF COMMUNICATION </span></p>
                  <p className='section__text'>Any such notice shall be deemed (in absence of evidence to the contrary) to have been received:</p>
                  <p className='section__text'>(I) If delivered personally or by hand, at the time of delivery;</p>
                  <p className='section__text'>(II) If posted, within five (5) business days after posting;</p>
                  <p className='section__text'>(III) If verbal, by telephone, when actually given;</p>
                  <p className='section__text'>(IV) If by leaving a message on a telephone answering machine or voice mail, when the message was left;</p>
                  <p className='section__text'>(V) If sent by facsimile, upon receiving confirmation of its transmission;</p>
                  <p className='section__text'>or</p>
                  <p className='section__text'>(VI) If sent by electronic mail, when the message is sent unless a “not sent” message or “not received” message is received from the sender’s electronic mail provider.</p>
                  <p><span className='aml__subtitle-2'> 17.9.3. COMMUNICATION DISCLAIMER </span></p>
                  <p className='section__text'>The client confirms that it has a regular access to the internet and consents to Company providing information, including but not limited to the information concerning the Best Execution Policy, Risk Disclosure Statement, or any other relevant Policy which affects the relationship between the Client and Company by e-mail or by posting it on the Website as Company may from time to time notify to the Client.</p>
                  <p><span className='aml__subtitle-2'> 17.9.4. NOTICE OF CHANGES </span></p>
                  <p className='section__text'>The client may change the address, facsimile number and e-mail address indicated above to which Company will send any notice or communication relating to this Agreement and Company may change the contact details indicated above, provided that in either cases the change will be effective on the date specified in the relevant notice (subject to Section 17.9.2).</p>
                  <p><span className='aml__subtitle-2'> 17.9.5. ELECTRONIC COMMUNICATION </span></p>
                  <p className='section__text'>Any written notice (including the notice to terminate this agreement) or other written communication to be given to the Client by Company, including the Reports, may be sent to the Client in an electronic form (without prejudice to Section 10.3). The Client should verify the contents of each document sent by Company as, in absence of any manifest error, the notice shall be conclusive unless the Client notifies Company in writing within 3 business days of the date of receipt of the relevant notice of any mistake, error or inaccuracy in such document.</p>
                  <p><span className='aml__subtitle-2'> 17.9.6. AUTHORISATION OF COMMUNICATION </span></p>
                  <p className='section__text'>The client irrevocably authorises Company to communicate with the client by letter, e-mail, facsimile or telephone to discuss matters in relation to the Account, at any time whatsoever unless specifically requested otherwise in writing by the Client.</p>
                  <p><span className='aml__subtitle-2'> 17.9.7. GOVERNING LAW AND JURISDICTION </span></p>
                  <p className='section__text'>This agreement and any contracts and transaction contemplated by this Agreement shall be governed by and construed in accordance with Estonia law. Company and the Client irrevocably agree that the courts of Estonia shall have jurisdiction to hear all and any disputes, controversies or claims (of any and every kind of type, whether based on this Agreement, tort, statute, regulation or otherwise) arising out of, relating to, or connected with this Agreement, including as to its construction, validity, interpretation and enforceability or breach (a “Dispute”) and, for such purposes, irrevocably submit to the jurisdiction of the courts of Estonia.</p>
                  <p className='section__text'>The Client agrees to waive any right the Client may have now or in the future to object to the courts of Estonia being nominated as a forum to hear any Dispute, and the Client irrevocably agrees only to bring proceedings in the courts of Estonia. The submission to the jurisdiction of the courts of Estonia shall not limit the right of Company to take proceedings against the Client in relation to any Disputes in any jurisdiction that Company considers appropriate nor shall the taking of proceedings in one or more jurisdictions prelude us from taking proceedings in any other jurisdictions, whether concurrently or not, if and to the extent permitted by applicable law.</p>
                  <p><span className='aml__subtitle-2'> 18. DISPUTES AND COMPLAINTS </span></p>
                  <p className='section__text'>
                    The Client shall immediately inform the Complaints department via e-mail to <a href='mailto:complaints@s2trade.com'>complaints@s2trade.com</a> of any dispute and complaint the Client may have in relation to the services provides by the Company. Such complaint (along with all the relevant details) will be dealt with in accordance with the Company internal procedures. The purpose of this procedure is to ensure fair and consistent dealing with client complaints whilst striving to provide the highest level of customer service. Company will endeavour to investigate any dispute or complaint as soon as reasonably practicable and will notify the Client of the results of such investigation via e-mail or phone by our dedicated Customer Relations Executives in maximum 48 business hours from the moment the complaint was submitted.
                  </p>
                  <p><span className='aml__subtitle-2'> 19. BONUS TERMS AND CONDITIONS </span></p>
                  <p className='section__text'>These Bonus Terms, together with all Company’s policies are an inseparable part of a binding agreement between the client and the company, including the Disclaimer of Warranty as appearing on the company website.<br />
                    Company may at any time without limitation amend any of the terms set out in this Agreement by posting such information on the website.<br />
                    Bonuses may be given at our discretion to new clients of any type of S²trade account, as a welcome promotion on first deposits. The usage of bonus and the services derived from it is mandatory and any inactivity on the account, will result in the removal of the bonus after 6 months from the day it was deposited to the account.<br />
                    Withdrawals of bonuses are subject to trading activities and traded lots. For a bonus of $1.000, the minimum lots required are 200 (“Required Trading Volume”).<br />
                    If the client requests to withdraw funds before executing the required trading volume, all the credit and the profits derived from it, will be canceled automatically upon withdrawing and only after applying The Company’s Terms and Conditions.<br />
                    The client is able to withdraw his deposit at any time however all the credit will be deducted due to trading volume not being reached. The profits will become liquid only after the trading volume will be met.<br />
                    If the client’s equity will drop below the credit amount or it’s equal to it, the client is not eligible to Withdraw the remaining funds, due to credit volume not being met.<br />
                    In case the required turnover was reached, the new amount eligible for a withdrawal will include all the credit and profits, present in the account.
                  </p>
                  <p><span className='aml__subtitle-2'> 20. REFUND POLICY </span></p>
                  <p className='section__text'>All sales of products are final. Fees paid for products and services are non-refundable. Prices for products offered via the Trading Platform and/or Company website may change at any time, and the Trading Platform and/or Company website do not provide price protection or refunds in the event of a price reduction or promotional offering. If a product becomes unavailable following a transaction but prior to download, your sole remedy is a refund. If technical problems prevent or unreasonably delay delivery of your product, your exclusive and sole remedy is either replacement or refund of the price paid, as determined by Company.</p>
                  <p><span className='aml__subtitle-2'> BONUS PROGRAM </span></p>
                  <p className='section__text'>1. OVERVIEW<br />
                    1.1 Bonuses are credited to one (1) per account for the initial deposit only. Subsequent deposits will be ineligible for additional bonuses.<br />
                    1.2 In order to receive the bonus, the following procedure must be followed:<br />
                    Once initial deposit has been credited to the account, Client will notify their account manager or via Customer Support at <a href='mailto:support@s2trade.com'>support@s2trade.com</a>
                  </p>
                  <p className='section__text'>2. BONUS STRUCTURE<br />
                    2.1 The bonus can be added to equity and is immediately tradable, subject to Compliance requirements.<br />
                    2.2 The maximum amount of bonus a client is able to receive must not be higher than 30% of the deposit amount and lower than 10.000 USD, convertible in the base currency of the account<br />
                    2.3 Bonus may be withdrawn only once Required Trading Volume has been reached.<br />
                    2.4 The trading volume is calculated from the first trade after the bonus is credited to the account.<br />
                    2.5 Withdrawal of profits made while enjoying the bonus are subject to the same volume requirements.
                  </p>
                  <p className='section__text'>3. RESTRICTIONS<br />
                    3.1 Normal losses incurred by the client are not subject to additional bonus payments.<br />
                    3.2 Company has the unilateral, retroactive and unconditional right to refuse participation or withdraw the promotion without prior notice, for any (but not limited to) the following reasons:<br />
                    a. a breach of the company trading terms and conditions<br />
                    b. a breach of the terms and conditions of this Bonus terms and conditions<br />
                    c. trading terms not being satisfied and/or expiration of the promotion<br />
                    d. Any reasonable ground the company has to believe trading misuse or misconduct or any suspicion the that the client is using an expert advisor and/or any manipulation of the promotion in any way.
                  </p>
                  <p className='section__text'>If S²trade suspects or has reason to believe that a client has abused or attempted to abuse the terms of this offer or any other promotion of S²trade or has acted in bad faith, S²trade reserves the right, at its sole discretion, if necessary to:<br />
                    a. to deny, withhold, withdraw or cancel and subtract the Bonus from the client’s account(s)<br />
                    b. to terminate the client’s access to services provided by S²trade and/or terminate the contract between S²trade<br />
                    c. to block that client’s account(s) and to arrange for the transfer of any unused balance (less the trading Bonus) to the client, without the client’s consent.<br />
                    d. If the Company suspects or has reason to believe that a Client has more than one account under this Bonus, or that a client has abused the terms and conditions of this Offer by hedging his positions internally (using other trading accounts held with S²trade) or externally (using other trading accounts held with other brokers), then the Company reserves the right, without the Client’s consent to immediately withdraw the trading Bonus from the Client’s trading account(s).
                  </p>
                  <p className='section__text'>3.3 If the deposit is withdrawn without any trading activity, the bonus will be canceled.<br />
                    3.4 Withdrawals made prior to the required Trading Volume being reached will be credited into the client’s account if he/she possess enough available funds, after the deduction of credit and profits, present in the account.<br />
                    3.5 Should the account stop-out and Client makes a new deposit into the account, the Required Trading Volume resets from the date of the new deposit.<br />
                    3.6 Should the account reach a negative balance while trading, the company will withdraw the whole bonus amount, and reset the account balance to zero. Any new deposits or bonuses will not be subject to previous trading conditions.<br />
                    3.7 Should Client receive any other special promotional credit, the Required Trading Volume must be met for the initial bonus before any additional credit can be calculated.
                  </p>
                  <p><span className='aml__subtitle-2'> DISCLAIMER OF WARRANTY </span></p>
                  <p className='section__text'>YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK AND THAT THE ENTIRE RISK AS TO SATISFACTORY QUALITY, PERFORMANCE, ACCURACY AND EFFORT IS WITH YOU. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES OFFERED OR RENDERED BY THE COMPANY “AS IS” AND “AS AVAILABLE”, WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND, AND COMPANY HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS AND ANY SERVICES, EITHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES AND/OR CONDITIONS OF MERCHANTABILITY, OF SATISFACTORY QUALITY, OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY, OF QUIET ENJOYMENT, AND NON-INFRINGEMENT OF THIRD PARTY RIGHTS. COMPANY DOES NOT WARRANT AGAINST INTERFERENCE WITH YOUR ENJOYMENT OF THE SERVICE, THAT THE FUNCTIONS CONTAINED IN OR SIGNALS SERVICE PERFORMED OR PROVIDED TO THE USER WILL MEET YOUR REQUIREMENTS, THAT THE OPERATION OF THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS IN THE SERVICES WILL BE CORRECTED. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY COMPANY OR ITS AUTHORIZED REPRESENTATIVE SHALL CREATE A WARRANTY SHOULD THE SERVICE PROVE DEFECTIVE TO THE EXTENT PERMITTED BY THE APPLICABLE LAW.</p>
                  <p><span className='aml__subtitle-2'> COMPANY’S SERVICES ARE NOT AVAILABLE FOR USE BY PERSONS UNDER THE AGE OF 18. </span></p>
                  <p className='section__text'>TRADING IN CURRENCIES INVOLVES AN EXTREMELY HIGH DEGREE OF RISK. INVESTORS CAN AND FREQUENTLY DO LOSE ALL OR PART OF THE MONEY THEY DEPOSIT. PLEASE READ, UNDERSTAND AND CAREFULLY CONSIDER THE RISK DISCLOSURE STATEMENT BEFORE MAKING A DECISION TO TRADE CURRENCIES.</p>
                </section>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleNested}>OK</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <div>
            By clicking anywhere in the page, I agree to the terms and conditions specified{' '}
            <Button
              className='trader_nested-modal-link'
              onClick={this.toggleNested}
              onKeyPress={this.toggleNested}
            >
              here
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    )
  }
}

export default HocModal
