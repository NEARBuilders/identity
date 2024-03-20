const questions = props.questions || [
  {
    question: "What does KYC mean?",
    answer:
      "KYC (Know-Your-Customer) is a standard verification process used by a variety of companies to verify the identity of the people they interact and/or transact with. Similarly, KYB (Know-Your-Business) is a verification process used to verify the legitimacy of organizations and their shareholders/authorized representatives.",
  },
  {
    question: "Why is KYC required?",
    answer:
      "Following KYC procedures is crucial for companies to ensure compliance with local and global AML (Anti-Money Laundering) requirements are met.",
  },
  {
    question: "What does KYC accomplish?",
    answer:
      "Issuing regular KYC checks maintains financial transparency and safety by preventing companies from engaging in potential criminal activity with a counterparty.",
  },
  {
    question: "When should I complete KYC?",
    answer:
      "If you are planning to receive a payment from the NDC you will need to submit a KYC profile and receive an approval of that profile.",
  },
  {
    question: "How do I complete KYC?",
    answer:
      "Visit kyc.near.org and choose the appropriate verification journey. Individuals select the KYC option and organizations select the KYB option.",
  },
  {
    question: "How long does KYC take to complete?",
    answer:
      "Completing the KYC profile should take up to 15 minutes, but it may take longer if you do not have easy access to the requested information.",
  },
  {
    question: "How long does it take for the KYC profile to be approved?",
    answer:
      "Once a KYC profile has been fully submitted, it will go under review which can take up to 48 business hours. Pending review the user will receive an email notifying of an approval, rejection, or request for more information.",
  },
  {
    question: "What do I need to complete KYC?",
    answer:
      "The typical requested information includes a government issued ID, proof of your residential address, your NEAR wallet, and a live selfie of your face. Be advised that KYC requirements may vary by region or be subject to changes in the future.",
  },
  {
    question: "What if I do not have proof of my residential address?",
    answer:
      "Proof of your residential address is mandatory for your KYC profile to be approved.",
  },
  {
    question: "Which NEAR wallet do I add to my KYC profile?",
    answer:
      "The NEAR wallet you add to your KYC profile will be the wallet that ultimately receives payment. NDC will not send payment to a NEAR wallet until it has been verified through your profile. If you wish to change this wallet in the future you can upload a new wallet address and it will be subsequently verified.",
  },
  {
    question: "What happens if I don’t pass KYC?",
    answer:
      "If you do not pass this means you were either requested to submit more information or you were rejected. If requested for more information, you will need to submit the required information to be approved. If rejected, you will not be eligible to receive payment until you resolve the issue and your profile is approved.",
  },
  {
    question: "Why was my KYC rejected?",
    answer:
      "There are many reasons you may have been rejected. Oftentimes it is because you have used a different email to create a different KYC profile, or you may have used a different email to complete another company’s KYC journey. Be advised you can only have one email associated with an approved KYC profile that is linked to your identity. Other reasons for rejection may include but are not limited to: residence in a sanctioned country, attempted/suspected fraud, or expired documents.",
  },
  {
    question: "How do I fix a KYC rejection?",
    answer:
      "Depending on the reason for rejection, you can reupload corrected information which will undergo another review.",
  },
  {
    question: "Can I receive payment if I was rejected?",
    answer:
      "No, you will not be eligible to receive payment until you receive an approved KYC profile.",
  },
  {
    question: "Can someone else receive payment on my behalf?",
    answer:
      "This is only possible if both parties have received an approved KYC profile and they have communicated with the NDC in writing of their intentions. This is not recommended as an ongoing practice.",
  },
  {
    question: "Can I receive payment if I reside in a sanctioned country?",
    answer:
      "Your KYC profile will receive a rejection if you reside in a sanctioned country. NDC will evaluate each rejected and sanctioned profile on a case-by-case basis, however, NDC does not guarantee any resolution leading to payment.",
  },
  {
    question: "How do I bypass sanctions?",
    answer:
      "Any attempt to bypass sanctions would be considered a violation of AML guidelines. This will lead to you being blacklisted in NDC’s system and make you ineligible to receive payment at any time in the future.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes, your information is stored on secure servers by the KYC screening tool and will not be shared by any party.",
  },
  {
    question: "Can I delete my information?",
    answer:
      "Yes, you can submit a request to delete your information by messaging: support@fractal.id",
  },
  {
    question: "Will the KYC support email help me pass KYC?",
    answer:
      "NDC’s KYC support email nearkyc@gmail.com will not offer advice on how to pass KYC, however, NDC will do its best to answer questions regarding your profile.",
  },
];

const questionSectionClass = {
  background: "#fff",
  border: "1px solid #d6e0f1",
  borderRadius: "10px",
  marginBottom: "16px",
  color: "#383e4d",
  overflow: "hidden",
};

const accordionItems = questions.map((item, id) => {
  const collapseTarget = `collapse${id}`;
  const headerTarget = `heading${id}`;

  return (
    <div className="accordion-item" style={questionSectionClass}>
      <h4 class="accordion-header" id={headerTarget}>
        <button
          className="accordion-button collapsed"
          style={{ fontSize: "21px", fontWeight: "500", boxShadow: "none" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseTarget}`}
          aria-expanded="false"
          aria-controls={collapseTarget}
        >
          {item.question}
        </button>
      </h4>
      <div
        id={collapseTarget}
        className="accordion-collapse collapse"
        aria-labelledby={headerTarget}
        data-bs-parent="#faq"
      >
        <div className="accordion-body">{item.answer}</div>
      </div>
    </div>
  );
});

const accordion = (
  <div class="accordion" id="faq">
    {accordionItems}
  </div>
);

const contactSection = (
  <div className="mt-5 text-center">
    <h3>Still have questions?</h3>
    <h5>
      <b>Contact Us:</b> nearkyc@gmail.com
    </h5>
  </div>
);

return (
  <>
    <h2 className="m-3 text-center">Frequently Answered Questions</h2>
    <div className="row m-2">
      <div className="col-12 m-2">{accordion}</div>
      <div className="col-12 m-2 mb-5">{contactSection}</div>
    </div>
  </>
);