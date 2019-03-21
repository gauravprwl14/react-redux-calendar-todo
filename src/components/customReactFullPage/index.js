// module.exports = {
//   SectionsContainer: require('./src/SectionsContainer').default,
//   Section: require('./src/Section').default,
//   ScrollToTopOnMount: require('./src/ScrollToTopOnMount').default,
//   Header: require('./src/Header').default,
//   Footer: require('./src/Footer').default,
// }

import CustomSectionContainer from "./src/SectionsContainer";
import CustomSection from "./src/Section";
import CustomScrollToTopOnMount from "./src/ScrollToTopOnMount";
import CustomHeader from "./src/Header";
import CustomFooter from "./src/Footer";

export default {
  SectionsContainer: CustomSectionContainer,
  Section: CustomSection,
  ScrollToTopOnMount: CustomScrollToTopOnMount,
  Header: CustomHeader,
  Footer: CustomFooter
};

export const SectionsContainer = CustomSectionContainer;
export const Section = CustomSection;
export const ScrollToTopOnMount = CustomScrollToTopOnMount;
export const Header = CustomHeader;
export const Footer = CustomFooter;

// export const SectionsContainer = SectionsContainer;
// export const Section = Section;
// export const ScrollToTopOnMount = ScrollToTopOnMount;
// export const Header = Header;
// export const Footer = Footer;
