<?php

$start = "define(['twig'], function (twig) {
  'use strict'

  var templates = {";

$end = "
  }

  return templates
})
";

$files = getTwigTemplates('app/templates');

$output = '';

foreach ($files as $file) {
  $template = file_get_contents('app/templates/' . $file . '.html');
  $template = str_replace("\n", '', $template);

  $output .= "'" . $file . "': twig.twig({
          data: '" . $template . "'\n" . '}),' . "\n";
}

$file = $start . "\n" . $output . "\n" . $end;

file_put_contents('app/scripts/templates.js', $file);

function getTwigTemplates ($path, $parent = NULL) {
  if (!$parent) {
    $parent = $path;
  }

  $cleaned_path = str_replace(array($parent . '/', $parent), '', $path);

  $files = scandir($path);
  unset($files[0]);
  unset($files[1]);

  $sub_file_group = array();

  foreach ($files as $delta => $file) {
    if (is_file($path . '/' . $file)) {
      $cleaned_file = str_replace('.html', '', $file);

      if ($cleaned_path) {
        $files[$delta] = $cleaned_path . '/' . $cleaned_file;
      }
      else {
        $files[$delta] = $cleaned_file;
      }
    }
    elseif (is_dir($path . '/' . $file)) {
      unset($files[$delta]);
      $sub_file_group[] = getTwigTemplates($path . '/' . $file, $parent);
    }
  }

  foreach ($sub_file_group as $sub_files) {
    $files = array_merge($files, $sub_files);
  }

  sort($files);

  return $files;
}
