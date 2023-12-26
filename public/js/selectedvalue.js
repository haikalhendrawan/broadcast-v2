$(document).ready(function() {
  $('#number').change(function() {
  const selectedNumber = $(this).val();
  $('option').removeAttr('selected');
  $(`option[value="${selectedNumber}"]`).attr('selected', 'selected');
  });
});