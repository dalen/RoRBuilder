/* global ga */

export function gaEvent(
  category: string | false = false,
  action: string | false = false,
  label: string | false = false,
  value: string | false = false,
) {
  // Sending to Google Analytics
  // console.log('Sending GA Event', { 'category': category, 'action': action, 'label': label, 'value': value });
  ga('send', {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
  });
}

export const gaChangeCareer = (changeType: string) => {
  gaEvent('Career changed', changeType);
};

export const gaCareerSelected = (
  name: string,
  careerClass: string,
  race: string,
) => {
  gaEvent('Career selected', name);
  gaEvent('Class selected', careerClass);
  gaEvent('Race selected', race);
};
