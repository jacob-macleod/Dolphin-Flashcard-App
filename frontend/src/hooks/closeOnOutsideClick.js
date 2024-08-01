import { useEffect } from 'react';

const closeOnOutsideClick = (ref, setVisible, tagName = 'IMG') => {
  useEffect(() => {
    const closeDropdown = (e) => {
      let targetElement = e.target;

      // Traverse up the DOM tree until we find a matching tag name or reach the document body
      while (targetElement && targetElement.tagName !== tagName) {
        targetElement = targetElement.parentNode;
      }

      // If targetElement is null, it means we reached the document body without finding the specified element
      if (!targetElement) {
        setVisible(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => document.body.removeEventListener('click', closeDropdown);
  }, [ref, setVisible, tagName]);
};

export default closeOnOutsideClick;