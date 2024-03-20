const { code, state } = props;

const [businessUrl, setBusinessUrl] = useState("");
const [individualUrl, setIndividualUrl] = useState("");
const [success, setSuccess] = useState(false);
const [pending, setPending] = useState(false);

const VERIFIER_API_URL = "https://ndc-builders.vercel.app";
const CHALLENGE_ENDPOINT = "challenge/fractal";
const VERIFY_ENDPOINT = "verify/fractal";

const ipfsImages = {
  illustrations: {
    verification: "QmdRUtCF6WA5oZo4D318R2i8XLSNy3FpC8PWdiDpsRJS4F",
  },
};

const returnIpfsImage = (cfid) => {
  return {
    ipfs_cid: cfid,
  };
};

const getBusinessUrl = () => {
  asyncFetch(`${VERIFIER_API_URL}/${CHALLENGE_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userType: "KYB",
    }),
  }).then((data) => setBusinessUrl(data.body.challenge));
};

const getIndividualUrl = () => {
  asyncFetch(`${VERIFIER_API_URL}/${CHALLENGE_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userType: "KYC",
    }),
  }).then((data) => setIndividualUrl(data.body.challenge));
};

const verifyUser = () => {
  asyncFetch(`${VERIFIER_API_URL}/${VERIFY_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      proof: code,
      challenge: state,
    }),
  }).then((data) => {
    if (!!data?.body?.signature) {
      setSuccess(true);
    } else {
      setPending(true);
    }
  });
};

useEffect(() => {
  getBusinessUrl();
  getIndividualUrl();

  if (code && state) {
    verifyUser();
  }
}, []);

const Wrapper = styled.div`
  --section-gap: 93px;
  --text-hero: 500 72px/1 "FK Grotesk", "Mona Sans", sans-serif;
  margin-top: calc(var(--body-top-padding) * -1);
  width: 100%;

  a {
    text-decoration: none; 
  }

  a:hover, a:focus {
    text-decoration: none; 
  }

  @media (max-width: 900px) {
    --section-gap: 80px;
  }
`;

const H1 = styled.h1`
  font: var(--text-hero);
  letter-spacing: -3px;
  text-align: center;
  color: var(--white);
  margin: 0;

  @media (max-width: 900px) {
    font-size: 48px;
  }
`;

const H2 = styled.h2`
  font: var(--text-hero);
  font-size: 56px;
  line-height: 1.3;
  color: var(--white);
  margin: 0;

  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

const Text = styled.p`
  font: var(--${(p) => p.size ?? "text-base"});
  font-weight: ${(p) => p.fontWeight} !important;
  color: var(--${(p) => p.color ?? white});
  margin: 0;

  @media (max-width: 900px) {
    font: var(--${(p) => p.mobileSize ?? p.size ?? "text-base"});
  }
`;

const MainText = styled.p`
  font: var(--${(p) => p.size ?? "text-base"});
  font-weight: ${(p) => p.fontWeight} !important;
  color: white;
  margin: 0;
  width: 50%;
  text-align: justify;

  @media (max-width: 900px) {
    font: var(--${(p) => p.mobileSize ?? p.size ?? "text-base"});
  }
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};

  ${(p) =>
    p.mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
    }
  `}

  @media (max-width: 900px) {
    gap: ${(p) => p.mobileGap ?? p.gap};
    align-items: ${(p) => p.mobileAlignItems ?? p.alignItems};
  }
`;

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.gap};
  grid-template-columns: ${(p) => p.columns};
  align-items: ${(p) => p.alignItems};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${(p) => p.mobileGap ?? p.gap};
  }
`;

const Section = styled.div`
  --background-color: ${(p) => p.backgroundColor};
  background-color: var(--background-color);
  position: relative;
  padding: 139px 23px;
  overflow: hidden;

  @media (max-width: 900px) {
    padding: var(--section-gap) 23px;
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1223px;
  margin: 0 auto;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
`;

const Pattern = styled.div`
  width: 100%;
  min-height: 620px;
  display: flex;
  align-items: center;
  margin: 8px;
  padding: 12px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGeSURBVHgB7doxTisxEAbgeY/mvQro6NiSDo6QkpJbcA2OwjWooKQMJ2DpKENJBV7FEYoBeQSIZr9PGk2cItWvsdfZnSBjKHVf6rnUbdD1N8g4K7VX6jhIEaycofaTIEWwcoam0yFYOYe179WiQ7Byhk8+8wnB6munlHNWgmD1tUGyFSYIVl8bJFcOCYLV106s/aBrJ2hNE+qo1GmpRanz2J5aB6X+x/oQv/l+FWz5E/O1iHU4pom0W/u0/uoZahnrgN2VGuv6Jpidl1+o2T5BznkrfKj9MdZT6l9836r+3k2pq1KXMVNz3gpbU7hOmj49AQ7x/lJ0WWsK5xhv2+AYkHQR29vbddDluqFvbNZPQZdg9S07az4gWH3tHZVgJQhW3xjb4XIZyo+Z3nffHN79CZ1gYuXc1b4KEytFsHLGptMhWDlj7Q9BimDlbJ4Ex4AftggHdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIpXoUVLSWulnzoAAAAASUVORK5CYII=");
  background-size: 72px 72px;
  background-repeat: repeat;
  background-position: center top;

  @media (max-width: 900px) {
    min-height: 390px;
  }
`;

const PatternContent = styled.div`
  max-width: 808px;
  margin: 0 auto;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  min-height: 260px;
  padding: 39px 0 0 0;

  @media (max-width: 900px) {
    min-height: 0px;
  }
`;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1em 3em 3em 3em;

  .image {
    display: block;
    height: 5em;
    margin: 0.5em;
  }
`;

const StyledText = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
`;

return (
  <Wrapper>
    <Section backgroundColor="#5526AB" style={{ padding: "42px 0" }}>
      <Container center>
        <Pattern>
          <PatternContent>
            <Flex gap="23px" direction="column" alignItems="center">
              <img
                src="https://builders.mypinata.cloud/ipfs/QmRUBcvnoaUsLkAA4ohJthZ3M25UCsnw8R8hySatDojvBa"
                style={{ width: "30%", height: "auto" }}
              ></img>
              {!success && !pending && (
                <>
                  <MainText
                    fontWeight="523"
                    size="text-l"
                    mobileSize="text-base"
                    color="white"
                  >
                    The NEAR ecosystem requires individuals and businesses to
                    verify their identities as a prerequisite to receiving
                    payments in the form of a grants, bounties, or other
                    rewards.
                  </MainText>
                  <MainText
                    fontWeight="523"
                    size="text-l"
                    mobileSize="text-base"
                    color="white"
                  >
                    Complete your KYC journey by clicking one of the buttons
                    below.
                  </MainText>
                  <Flex
                    gap="23px"
                    wrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <div className="mb-5">
                      <a
                        className="btn btn-lg btn-outline-light m-2"
                        href={individualUrl}
                      >
                        <b>KYC (for Individuals)</b>
                      </a>
                      <a
                        className="btn btn-lg btn-outline-light m-2"
                        href={businessUrl}
                      >
                        <b>KYB (for Businesses)</b>
                      </a>
                    </div>
                  </Flex>
                </>
              )}
              {pending && (
                <>
                  <MainText
                    fontWeight="523"
                    size="text-l"
                    mobileSize="text-base"
                    color="white"
                  >
                    Your identity is being reviewed. You will receive an email
                    once the review process has finished.
                  </MainText>
                </>
              )}
              {success && (
                <>
                  <MainText
                    fontWeight="523"
                    size="text-l"
                    mobileSize="text-base"
                    color="white"
                  >
                    Your identity has been successfully verified.
                  </MainText>
                </>
              )}
            </Flex>
          </PatternContent>
        </Pattern>
      </Container>
    </Section>
    <div
      style={{
        padding: "8px 39px 39px 39px",
        color: "#fff",
        backgroundColor: "#5526AB",
      }}
    >
      <h1 className="mb-4 text-center">
        <b>DISCLAIMER</b>
      </h1>
      <ol>
        <li className="mb-3">
          <b>Compliance Notice:</b> We adhere to the highest standards of legal
          compliance in anti-money laundering (AML) regulations as required by
          Cayman Islands law.
        </li>
        <li className="mb-3">
          <b>Privacy Commitment:</b> We commit to securely managing and
          protecting your personal information. Our use of your data is solely
          for KYC purposes.
        </li>
        <li className="mb-3">
          <b>User Eligibility:</b> Services are available to individuals aged 18
          and above. Some services may not be available in certain jurisdictions
          due to legal restrictions.
        </li>
      </ol>
    </div>
    <Section backgroundColor="#fff">
      <Container>
        <Widget
          src="near/widget/NearOrg.ContentWithImage"
          key="verification"
          props={{
            content: (
              <Flex direction="column" gap="39px">
                <Flex direction="column" gap="23px">
                  <Text
                    color="black"
                    size="text-xl"
                    mobileSize="text-l"
                    fontWeight="555"
                  >
                    Trusted Services
                  </Text>
                  <Text color="black">
                    We utilize the best-in-class identity verification tools in
                    Web3.
                  </Text>
                </Flex>

                <Flex direction="column" gap="23px">
                  <Text
                    color="black"
                    size="text-xl"
                    mobileSize="text-l"
                    fontWeight="555"
                  >
                    Privacy Protected
                  </Text>
                  <Text color="black">
                    Your private information is never shared without your
                    consent.
                  </Text>
                </Flex>

                <Flex direction="column" gap="23px">
                  <Text
                    color="black"
                    size="text-xl"
                    mobileSize="text-l"
                    fontWeight="555"
                  >
                    We Can Help
                  </Text>
                  <Text color="black">
                    Check out our identity verication FAQs below. All other
                    questions can be directed to <b>compliance@neardc.org</b>.
                  </Text>
                </Flex>
                <Flex gap="23px" wrap="wrap" alignItems="left">
                  <Link
                    className="btn btn-dark"
                    to={"/${config_account}/widget/faq"}
                  >
                    KYC FAQs
                  </Link>
                </Flex>
              </Flex>
            ),
            image: {
              url: "https://builders.mypinata.cloud/ipfs/QmdRUtCF6WA5oZo4D318R2i8XLSNy3FpC8PWdiDpsRJS4F",
            },
            imageSide: "left",
          }}
        />
      </Container>
    </Section>
    <StyledText
      size="14px"
      weight="600"
      style={{
        textTransform: "uppercase",
        letterSpacing: "0.17em",
        textAlign: "center",
      }}
    >
      Sponsored by NEAR Digital Collective
    </StyledText>
    <Flex>
      <Badge>
        <a href="https://near.org">
          <Widget
            src="mob.near/widget/Image"
            props={{
              className: "image",
              image: {
                url: "https://builders.mypinata.cloud/ipfs/QmTtTJDZwpZQLHLEK6RHcTonuEYWbYFGAaEtLQN93hTynU",
              },
              alt: "NDC",
            }}
          />
        </a>
      </Badge>
    </Flex>
  </Wrapper>
);