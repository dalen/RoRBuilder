/* global ga */

export function gaEvent(
  category = false,
  action = false,
  label = false,
  value = false,
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

export function gaChangeCareer(changeType) {
  gaEvent('Career changed', changeType);
}

export function gaCareerSelected(name, careerClass, race) {
  gaEvent('Career selected', name);
  gaEvent('Class selected', careerClass);
  gaEvent('Race selected', race);
}
